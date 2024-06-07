package main

import (
	"net/http"

	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.Home)
	mux.HandleFunc("/snippet/view", app.SnippetView)
	mux.HandleFunc("/snippet/create", app.SnippetCreate)

	myChain := alice.New(app.PanicRevocer)

	return myChain.Then(mux)
}
