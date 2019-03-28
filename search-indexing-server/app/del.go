package app

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/agzuniverse/MecBooksWatch/search-indexing-server/datatypes"
)

func (app *App) DelBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	var reqdata datatypes.DelReqData
	b, _ := ioutil.ReadAll(r.Body)
	if err := json.Unmarshal(b, &reqdata); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	app.logger.Info(reqdata)
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
	firestore, err := app.firebaseApp.Firestore(context.Background())
	_, err = firestore.Collection("textbooks").Doc(reqdata.ID).Delete(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	} else {
		// Delete book from algolia
		app.algoliaClient.DeleteObject(reqdata.ID)

		app.logger.Info("Textbook " + reqdata.ID + " deleted successfully")
		w.WriteHeader(http.StatusOK)
	}
	defer firestore.Close()

}
