package main

import (
	"os"
	"flag"
	"log"
	"net/http"
)

type application struct {
	ErrorLog *log.Logger
	InfoLog *log.Logger
}

func main() {
	addr := flag.String("addr", ":4000", "HTTP Adress Port")
	flag.Parse()
	
	// Custom loggers
	infoLog := log.New(os.Stdout, "INFO:\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	app := &application {
		ErrorLog : errorLog,
		InfoLog : infoLog,
	}

	srv := &http.Server {
		Addr :  *addr,
		ErrorLog: errorLog,
		Handler : app.routes(),
	}

	infoLog.Printf("Starting server on port %v...", *addr)
	err := srv.ListenAndServe()
	errorLog.Fatal(err)
}