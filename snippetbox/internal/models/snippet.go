package models

import (
	"database/sql"
	"errors"
	"time"
)

type Snippet struct {
	ID         int       `json:"ID"`
	Title      string    `json:"Title"`
	Content    string    `json:"Content"`
	Created    time.Time `json:"Created"`
	Expires    time.Time `json:"Expires"`
	IsPrivate  bool      `json:"IsPrivate"`
	SharedWith []UserDTO `json:"SharedWith"`
	Author     UserDTO   `json:"Author"`
}

type SnippetModel struct {
	DB *sql.DB
}

type UserDTO struct {
	ID       int    `json:"ID"`
	Username string `json:"Username"`
	Pfp      string `json:"Pfp"`
}

func (m *SnippetModel) Insert(title string, content string, expires int, sharedWith []int, author string) (int, error) {
	tx, err := m.DB.Begin()
	if err != nil {
		return 0, err
	}

	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p)
		} else if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()
	var authorID int

	query := `SELECT id FROM account WHERE username = $1;`
	err = tx.QueryRow(query, author).Scan(&authorID)
	if err != nil {
		return 0, err
	}

	var id int

	query = `SELECT createSnippet($1, $2, $3, $4);`
	err = tx.QueryRow(query, title, content, expires, authorID).Scan(&id)
	if err != nil {
		return 0, err
	}

	if len(sharedWith) > 1 {
		for _, v := range sharedWith {
			_, err = tx.Exec("SELECT addUsersSharedWithSnippet($1, $2);", v, id)
			if err != nil {
				return 0, err
			}
		}
		_, err = tx.Exec("UPDATE snippet SET isPrivate = true WHERE id = $1;", id)
		if err != nil {
			return 0, err
		}
	}

	return id, nil
}

func (m *SnippetModel) GetByID(id int) (*Snippet, error) {
	query := `
	SELECT s.id, s.title, s.content, s.created, s.expires, s.isPrivate, a.id, a.username, a.pfp
	FROM snippet s, account a
	WHERE s.id = $1
	AND a.id = s.author;
	`

	row := m.DB.QueryRow(query, id)

	var data Snippet

	err := row.Scan(&data.ID, &data.Title, &data.Content, &data.Created, &data.Expires, &data.IsPrivate, &data.Author.ID, &data.Author.Username, &data.Author.Pfp)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNoRecord
		} else {
			return nil, err
		}
	}

	if data.IsPrivate {
		rows, err := m.DB.Query(`
		SELECT a.id, a.username, a.pfp
		FROM account a
		WHERE a.id IN
			(
				SELECT user_id 
				FROM snippet_shared_with
				WHERE snippet_id = $1
			);`, id)
		if err != nil {
			return nil, err
		}

		defer rows.Close()

		for rows.Next() {
			user := UserDTO{}
			err := rows.Scan(&user.ID, &user.Username, &user.Pfp)
			if err != nil {
				return nil, err
			}
			data.SharedWith = append(data.SharedWith, user)
		}
	}

	return &data, nil
}

func (m *SnippetModel) GetAll() ([]*Snippet, error) {
	query := `
		SELECT s.id, s.title, s.content, s.created, s.expires, s.isPrivate, a.id, a.username, a.pfp
		FROM snippet s, account a
		WHERE s.expires > current_date
		AND s.author = a.id
		ORDER BY s.created DESC, s.id DESC
		LIMIT 10;`

	rows, err := m.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	snippets, err := extractRows(rows, m.DB)
	if err != nil {
		return nil, err
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return snippets, nil
}

func extractRows(rows *sql.Rows, db *sql.DB) ([]*Snippet, error) {
	data := []*Snippet{}

	for rows.Next() {
		snp := &Snippet{}
		err := rows.Scan(&snp.ID, &snp.Title, &snp.Content, &snp.Created, &snp.Expires, &snp.IsPrivate, &snp.Author.ID, &snp.Author.Username, &snp.Author.Pfp)
		if err != nil {
			return nil, err
		}
		if snp.IsPrivate {
			sharedRows, err := db.Query(`
				SELECT a.id, a.username, a.pfp
				FROM account a
				WHERE a.id IN (
					SELECT user_id 
					FROM snippet_shared_with
					WHERE snippet_id = $1
				);`, snp.ID)
			if err != nil {
				return nil, err
			}

			defer sharedRows.Close()

			for sharedRows.Next() {
				user := UserDTO{}
				err := sharedRows.Scan(&user.ID, &user.Username, &user.Pfp)
				if err != nil {
					return nil, err
				}
				snp.SharedWith = append(snp.SharedWith, user)
			}

			if err := sharedRows.Err(); err != nil {
				return nil, err
			}
		}

		data = append(data, snp)
	}

	return data, nil
}

func (m *SnippetModel) GetAllSharedWithUser(username string) ([]*Snippet, error) {
	var user_id int

	err := m.DB.QueryRow("SELECT id FROM account WHERE username = $1", username).Scan(&user_id)
	if err != nil {
		return nil, err
	}

	query := `
		SELECT s.id, s.title, s.content, s.created, s.expires, s.isPrivate, a.id, a.username, a.pfp
		FROM snippet s
		JOIN snippet_shared_with sw ON s.id = sw.snippet_id
		JOIN account a ON s.author = a.id
		WHERE sw.user_id = $1;
	`
	rows, err := m.DB.Query(query, user_id)
	if err != nil {
		return nil, err
	}

	snippets, err := extractRows(rows, m.DB)
	if err != nil {
		return nil, err
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	defer rows.Close()

	return snippets, nil
}
