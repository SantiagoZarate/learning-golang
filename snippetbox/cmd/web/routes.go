package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/", app.Home)
	router.HandlerFunc(http.MethodGet, "/snippet/view/:id", app.SnippetView)
	router.HandlerFunc(http.MethodPost, "/snippet/create", app.SnippetCreate)

	myChain := alice.New(app.PanicRevocer, app.VerifyToken)

	return myChain.Then(router)
}
