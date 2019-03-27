package main

import (
	"os"

	"github.com/agzuniverse/MecBooksWatch/search-indexing-server/app"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {
	app := app.NewApp()

	opt := option.WithCredentialsFile("./serviceaccount.json")
	apiID := os.Getenv("API_ID")
	apiKey := os.Getenv("API_KEY")
	indexName := os.Getenv("INDEX_NAME")

	// Create new router
	r := mux.NewRouter()
	r.HandleFunc("/postbook", app.PostBook).Methods("POST")
	r.HandleFunc("/deletebook", app.DelBook).Methods("POST")

	app.Initialize(apiID, apiKey, indexName, opt, r)

	app.Run(os.Getenv("PORT"))
}
