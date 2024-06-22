package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
	models "snippetbox.santiagozarate/internal/models"
	"snippetbox.santiagozarate/internal/validator"
)

type SnippetForm struct {
	Title   string `form:"title"`
	Content string `form:"content"`
	Expires int    `form:"expires"`
	validator.Validator
}

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

	snippet, err := app.Snippets.GetByID(id)
	if err != nil {
		if errors.Is(err, models.ErrNoRecord) {
			app.notFound(w)
		} else {
			app.serverError(w, err)
		}
	}

	err = json.NewEncoder(w).Encode(snippet)
	if err != nil {
		app.serverError(w, err)
	}
}

func (app *application) SnippetCreate(w http.ResponseWriter, r *http.Request) {
	var form SnippetForm

	err := app.FormDecoderHelper(r, &form)
	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return
	}

	form.CheckField(validator.MaxChar(form.Title, 100), "title", "Title too large, 100 characters max")
	form.CheckField(validator.NotBlank(form.Title), "title", "Title can not be empty")
	form.CheckField(validator.NotBlank(form.Content), "content", "Content can not be empty")
	form.CheckField(validator.MaxChar(form.Content, 200), "content", "Content too large")
	form.CheckField(validator.PermittedInt(form.Expires, 1, 2, 3), "expires", "expires must match 1, 2 or 3")

	if !form.Valid() {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(form.PrintErrors()))
		return
	}

	response := fmt.Sprintf("title: %v, content: %v", form.Title, form.Content)
	w.Write([]byte(response))
}
