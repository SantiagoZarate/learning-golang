package models

import "database/sql"

type UserDTO struct {
	ID       int    `json:"ID"`
	Username string `json:"Username"`
	Pfp      string `json:"Pfp"`
}

type UserModel struct {
	DB *sql.DB
}

func (m *UserModel) GetAll() ([]*UserDTO, error) {
	query := `
		SELECT id, username, pfp
		FROM account
		ORDER BY created_at DESC
		LIMIT 10;
	`

	rows, err := m.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	users, err := extractUserRows(rows)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func extractUserRows(rows *sql.Rows) ([]*UserDTO, error) {
	data := []*UserDTO{}

	for rows.Next() {
		user := &UserDTO{}
		err := rows.Scan(&user.ID, &user.Username, &user.Pfp)
		if err != nil {
			return nil, err
		}

		data = append(data, user)
	}

	return data, nil
}
