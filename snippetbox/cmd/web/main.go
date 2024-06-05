package main

import (
	"log"
	"net/http"
)

func main() {
	server := http.NewServeMux()
	server.HandleFunc("/", Home)
	server.HandleFunc("/snippet/view", SnippetView)
	server.HandleFunc("/snippet/create", SnippetCreate)

	log.Println("Starting server on port 4000...")
	err := http.ListenAndServe(":4000", server)
	log.Fatal(err)
}