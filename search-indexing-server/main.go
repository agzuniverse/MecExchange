package main

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"github.com/algolia/algoliasearch-client-go/algoliasearch"
	"github.com/fatih/structs"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/api/option"
)

type Textbook struct {
	Title     string `json:"title" firestore:"title"`
	Author    string `json:"author" firestore:"author"`
	Price     string `json:"price" firestore:"price"`
	Contact   string `json:"contact" firestore:"contact"`
	UserClass string `json:"userClass" firestore:"userClass"`
	IsOnWa    bool   `json:"isOnWa" firestore:"isOnWa"`
	UID       string `json:"uid" firestore:"uid"`
	Email     string `json:"email" firestore:"email"`
	Username  string `json:"username" firestore:"username"`
	Year      string `json:"year" firestore:"year"`
	Branch    string `json:"branch" firestore:"branch"`
	ImageURL  string `json:"imageURL" firestore:"imageURL"`
	FileID    string `json:"fileID" firestore:"fileID"`
}

type ReqData struct {
	IDToken    string   `json:"idToken"`
	TextbookID string   `json:"textbookID"`
	Data       Textbook `json:"data"`
}

func main() {
	client := algoliasearch.NewClient(os.Getenv("APPID"), os.Getenv("APIKEY"))
	index := client.InitIndex("textbooks")
	opt := option.WithCredentialsFile("./serviceaccount.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	r := mux.NewRouter()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		var reqdata ReqData
		var storedata Textbook
		b, _ := ioutil.ReadAll(r.Body)
		if err := json.Unmarshal(b, &reqdata); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}
		client, err := app.Auth(context.Background())
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("error getting Auth client: " + err.Error()))
		}
		idToken := reqdata.IDToken
		_, errr := client.VerifyIDToken(context.Background(), idToken)
		if errr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("error verifying ID token: " + err.Error()))
		}
		textbookID := reqdata.TextbookID
		firestore, err := app.Firestore(context.Background())
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}
		defer firestore.Close()
		snap, err := firestore.Collection("textbooks").Doc(textbookID).Get(context.Background())
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}
		snap.DataTo(&storedata)
		if storedata == reqdata.Data {
			o := []algoliasearch.Object{
				structs.Map(storedata),
			}
			index.AddObjects(o)
			w.Write([]byte("Book indexed"))
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Data invalid"))
		}
	}).Methods("POST")
	corshandler := cors.Default().Handler(r)
	http.Handle("/", corshandler)
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), nil))
}
