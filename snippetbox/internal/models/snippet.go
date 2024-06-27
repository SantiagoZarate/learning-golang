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
}

type SnippetModel struct {
	DB *sql.DB
}

type UserDTO struct {
	ID       int    `json:"ID"`
	Username string `json:"Username"`
	Pfp      string `json:"Pfp"`
}

func (m *SnippetModel) Insert(title string, content string, expires int, sharedWith []int) (int, error) {
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
	var id int

	query := `SELECT createSnippet($1, $2, $3);`
	err = tx.QueryRow(query, title, content, expires).Scan(&id)
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
	row := m.DB.QueryRow(`SELECT id, title, content, created, expires, isPrivate FROM snippet WHERE id = $1;`, id)

	var data Snippet

	err := row.Scan(&data.ID, &data.Title, &data.Content, &data.Created, &data.Expires, &data.IsPrivate)
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
		SELECT id, title, content, created, expires
		FROM snippet
		WHERE expires > current_date
		ORDER BY created DESC, id DESC
		LIMIT 10;`

	rows, err := m.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	snippets, err := extractRows(rows)
	if err != nil {
		return nil, err
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return snippets, nil
}

func extractRows(rows *sql.Rows) ([]*Snippet, error) {
	data := []*Snippet{}

	for rows.Next() {
		snp := &Snippet{}
		err := rows.Scan(&snp.ID, &snp.Title, &snp.Content, &snp.Created, &snp.Expires)
		if err != nil {
			return nil, err
		}
		data = append(data, snp)
	}

	return data, nil
}
