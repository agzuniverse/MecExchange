package app

import (
	"context"
	"log"
	"net/http"

	"firebase.google.com/go"
	"github.com/Sirupsen/logrus"
	"github.com/agzuniverse/MecBooksWatch/search-indexing-server/algolia"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

// App represents the search indexing app
type App struct {
	Router        *mux.Router
	algoliaClient *algolia.AlgoliaClient
	firebaseApp   *firebase.App
	logger        *logrus.Logger
}

func NewApp() *App {
	return new(App)
}

// Initialize initializes the app
func (app *App) Initialize(apiID, apiKey, indexName string, opt option.ClientOption, router *mux.Router) {
	app.logger = logrus.New()
	app.Router = router
	app.algoliaClient.Initialize(apiID, apiKey, indexName)
	app.firebaseApp, err = firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		app.logger.Fatalf("Error initializing firebase app: %v\n", err)
	}
	app.logger.Info("App initialized")
}

// Run runs the app
func (app *App) Run(addr string) {
	// Set cors headers and start server
	corshandler := cors.Default().Handler(r)
	http.Handle("/", corshandler)
	log.Fatal(http.ListenAndServe(":"+addr, nil))
	app.logger.Info("Listening on port " + addr)
}
