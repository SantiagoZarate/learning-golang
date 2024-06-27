package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/snippet", app.Home)
	router.HandlerFunc(http.MethodGet, "/snippet/view/:id", app.SnippetView)
	router.HandlerFunc(http.MethodGet, "/user", app.GetUsers)

	protectedChain := alice.New(app.PanicRevocer, app.AuthMiddleware)

	// Create a chain for the protected route
	router.Handler(http.MethodPost, "/snippet/create", protectedChain.ThenFunc(app.SnippetCreate))
	router.Handler(http.MethodGet, "/snippet/private", protectedChain.ThenFunc(app.SnippetsSharedWithUser))

	myChain := alice.New(app.PanicRevocer)

	return myChain.Then(router)
}
