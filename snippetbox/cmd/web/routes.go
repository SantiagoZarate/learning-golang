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

	// Create a chain for the protected route
	protected := alice.New(app.PanicRevocer, app.AuthMiddleware).ThenFunc(app.SnippetCreate)

	// Apply the chain to the protected route
	router.Handler(http.MethodPost, "/snippet/create", protected)

	myChain := alice.New(app.PanicRevocer)

	return myChain.Then(router)
}
