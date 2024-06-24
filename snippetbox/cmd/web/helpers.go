package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/go-playground/form/v4"
	"github.com/golang-jwt/jwt/v5"
)

func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.ErrorLog.Output(2, trace)

	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

func (app *application) clientError(w http.ResponseWriter, status int) {
	http.Error(w, http.StatusText(status), status)
}

func (app *application) notFound(w http.ResponseWriter) {
	app.clientError(w, http.StatusNotFound)
}

func (app *application) FormDecoderHelper(r *http.Request, dst any) error {
	// Check if the content type is application/json
	if r.Header.Get("Content-Type") == "application/json" {
		err := json.NewDecoder(r.Body).Decode(&dst)
		if err != nil {
			return err
		}
	} else {
		err := r.ParseForm()
		if err != nil {
			return err
		}

		err = app.FormDecoder.Decode(&dst, r.PostForm)
		if err != nil {
			var invalidDecodedError *form.InvalidDecoderError

			if errors.As(err, &invalidDecodedError) {
				panic(err)
			}

			return err
		}
	}
	return nil
}

func VerifyToken(r *http.Request) error {
	tokenString := r.Header.Get("access_token")
	if len(tokenString) == 0 {
		return errors.New("there is no token")
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
	return nil
}
