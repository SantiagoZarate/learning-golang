package main

import (
	sql "database/sql"
	"flag"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
	models "snippetbox.santiagozarate/internal/models"
)

type application struct {
	ErrorLog *log.Logger
	InfoLog  *log.Logger
	Snippets *models.SnippetModel
}

func main() {
	addr := flag.String("addr", ":4000", "HTTP Adress Port")
	flag.Parse()

	// Custom loggers
	infoLog := log.New(os.Stdout, "INFO:\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR:\t", log.Ldate|log.Ltime|log.Lshortfile)

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		errorLog.Fatal("DATABASE_URL must be provided")
	}

	db, err := openDB(dbURL)
	if err != nil {
		errorLog.Fatal(err)
	}
	defer db.Close()

	app := &application{
		ErrorLog: errorLog,
		InfoLog:  infoLog,
		Snippets: &models.SnippetModel{DB: db},
	}

	srv := &http.Server{
		Addr:     *addr,
		ErrorLog: errorLog,
		Handler:  app.routes(),
	}

	infoLog.Printf("Starting server on port %v...", *addr)
	svErr := srv.ListenAndServe()
	errorLog.Fatal(svErr)
}

func openDB(config string) (*sql.DB, error) {
	db, err := sql.Open("postgres", config)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
