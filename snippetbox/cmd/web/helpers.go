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

func (app *application) SendJson(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	jsonData, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		app.serverError(w, err)
		return
	}

	_, err = w.Write(jsonData)
	if err != nil {
		app.serverError(w, err)
		return
	}
}

var jwtSecret = []byte("super-duper-secret-key")

func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil {
		fmt.Print("El token es invalido, pero te dejo pasar porque soy copado")
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, errors.New("failed to decode token")
	}
}
