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

func (m *SnippetModel) Insert(id int, title string, content string, expires int) (int, error) {
	return 0, nil
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
