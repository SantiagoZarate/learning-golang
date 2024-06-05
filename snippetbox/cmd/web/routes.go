package main

import ("net/http")

func (app *application) routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.HandleFunc("/", app.Home)
	mux.HandleFunc("/snippet/view", app.SnippetView)
	mux.HandleFunc("/snippet/create", app.SnippetCreate)

	return mux
}