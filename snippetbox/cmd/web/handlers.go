package main

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	models "snippetbox.santiagozarate/internal/models"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	snippets, err := app.Snippets.GetAll()
	if err != nil {
		app.serverError(w, err)
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(snippets)
	if err != nil {
		app.serverError(w, err)
		return
	}
}

func (app *application) SnippetView(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil || id < 1 {
		app.notFound(w)
		return
	}

	data, err := app.Snippets.GetByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecord) {
			app.notFound(w)
		} else {
			app.serverError(w, err)
		}
	}

	err = json.NewEncoder(w).Encode(data)
	if err != nil {
		app.serverError(w, err)
		return
	}
}

func (app *application) SnippetCreate(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Creating a new snippet..."))
}
