package main

import (
	"log"
	"net/http"
)

func main() {
	server := http.NewServeMux()
	server.HandleFunc("/", home)
	server.HandleFunc("/snippet/view", snippetView)
	server.HandleFunc("/snippet/create", snippetCreate)

	log.Println("Starting server on port 4000...")
	err := http.ListenAndServe(":4000", server)
	log.Fatal(err)
}