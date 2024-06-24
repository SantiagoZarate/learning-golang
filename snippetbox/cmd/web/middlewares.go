package main

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
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

func (app *application) VerifyToken(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("access_token")
		if len(tokenString) == 0 {
			app.clientError(w, http.StatusUnauthorized)
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return secretKey, nil
		})
		if err != nil {
			fmt.Print("El token es invalido, pero te dejo pasar porque soy copado")
			// app.clientError(w, http.StatusBadRequest)
			// return
		}

		if !token.Valid {
			fmt.Print("El token es invalido, pero te dejo pasar porque soy copado")
			// app.clientError(w, http.StatusUnauthorized)
			// return
		}
		next.ServeHTTP(w, r)
	})
}

var secretKey = []byte("secret-key")
