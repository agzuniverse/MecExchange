package app

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
)

func (app *App) PostBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	var reqdata datatypes.PostReqData
	b, _ := ioutil.ReadAll(r.Body)
	fmt.Println(string(b))
	if err := json.Unmarshal(b, &reqdata); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	client, err := app.firebaseApp.Auth(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error getting Auth client: " + err.Error()))
		return
	}
	idToken := reqdata.IDToken
	_, err = client.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error verifying ID token: " + err.Error()))
		return
	}
	if reqdata.Data.Author == "" || reqdata.Data.Title == "" {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("author and title should not be empty"))
		return
	}
	price, err := strconv.Atoi(reqdata.Data.Price)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	if price < 0 {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("price should not be negative"))
		return
	}
	if len(reqdata.Data.Contact) != 10 {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Phone number should contain 10 digits"))
		return
	}
	firestore, err := app.firebaseApp.Firestore(context.Background())
	ref, _, err := firestore.Collection("textbooks").Add(context.Background(), reqdata.Data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	} else {
		textbookID := ref.ID

		// Add book to algolia
		app.algoliaClient.AddObject({textbookID: reqdata.Data})

		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Textbook added successfully"))
	}
	defer firestore.Close()
}
