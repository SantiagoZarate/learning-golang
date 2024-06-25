package models

import (
	"database/sql"
	"errors"
	"time"
)

type Snippet struct {
	ID      int
	Title   string
	Content string
	Created time.Time
	Expires time.Time
}

type SnippetModel struct {
	DB *sql.DB
}

func (m *SnippetModel) Insert(title string, content string, expires int) (int, error) {
	var id int
	query := `
		SELECT createSnippet($1, $2, $3);`

	err := m.DB.QueryRow(query, title, content, expires).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (m *SnippetModel) GetByID(id int) (*Snippet, error) {
	row := m.DB.QueryRow(`SELECT id, title, content, created, expires FROM snippet WHERE id = $1;`, id)

	var data Snippet

	err := row.Scan(&data.ID, &data.Title, &data.Content, &data.Created, &data.Expires)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNoRecord
		} else {
			return nil, err
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
