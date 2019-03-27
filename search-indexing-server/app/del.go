package app

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func (app *App) DelBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	var reqdata DelReqData
	b, _ := ioutil.ReadAll(r.Body)
	if err := json.Unmarshal(b, &reqdata); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	fmt.Println(reqdata)
	client, err := app.Auth(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error getting Auth client: " + err.Error()))
		return
	}
	idToken := reqdata.IDToken
	_, errr := client.VerifyIDToken(context.Background(), idToken)
	if errr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("error verifying ID token: " + errr.Error()))
		return
	}
	firestore, err := app.Firestore(context.Background())
	_, err = firestore.Collection("textbooks").Doc(reqdata.ID).Delete(context.Background())
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	} else {
		// Delete book from algolia
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Textbook Deleted successfully"))
	}
	defer firestore.Close()

}
