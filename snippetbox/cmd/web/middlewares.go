package main

import (
	"context"
	"fmt"
	"net/http"
)

type contextKey string

const (
	contextKeyUser contextKey = "username"
	contextKeyRole contextKey = "role"
)

func (app *application) PanicRevocer(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			err := recover()
			if err != nil {
				w.Header().Set("Connection", "close")
				app.serverError(w, fmt.Errorf("%s", err))
			}
		}()

		next.ServeHTTP(w, r)
	})
}

func (app *application) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("access_token")
		if len(tokenString) == 0 {
			app.clientError(w, http.StatusUnauthorized)
			return
		}

		claims, err := VerifyToken(tokenString)
		if err != nil {
			app.clientError(w, http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), contextKeyUser, claims["username"])
		ctx = context.WithValue(ctx, contextKeyRole, claims["role"])

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
