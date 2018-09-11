/* eslint-disable */
import * as firebase from "firebase";
import "firebase/firestore";
import * as algoliasearch from "algoliasearch";

const config = {
  apiKey: "AIzaSyDw_Tpy96dXGAd3z65s_s98pdd007MPysU",
  authDomain: "mecbookswatch.firebaseapp.com",
  projectId: "mecbookswatch",
  databaseURL: "https://mecbookswatch.firebaseio.com",
  storageBucket: "mecbookswatch.appspot.com"
};

firebase.initializeApp(config);
let db = firebase.firestore();

export function addToStorage(file, data) {
  return new Promise((resolve, reject) => {
    try {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      function guid() {
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
      }

      const uuid = guid();
      const storageRef = firebase.storage().ref();
      const storageAdd = storageRef.child(uuid + file.name);

      storageAdd.put(file).then(snapshot => {
        data.imageURL = snapshot.downloadURL;
        data.fileID = uuid + file.name;
        db.collection("textbooks")
          .add(data)
          .then(dataSnapshot => {
            console.log(`Book added successfully dataSnapshot ${dataSnapshot}`);
            console.log(dataSnapshot);
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                const algoData = {
                  idToken,
                  textbookID: dataSnapshot.id,
                  data
                };
                fetch("https://secret-escarpment-95373.herokuapp.com/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  },
                  body: JSON.stringify(algoData) // body data type must match "Content-Type" header
                })
                  .then(res => {
                    console.log(res);
                    resolve();
                  })
                  .catch(err => {
                    console.log(err);
                    reject();
                  });
              });
          });
      });
    } catch (e) {
      reject();
    }
  });
}

export function readFromStorage(uid) {
  return new Promise((resolve, reject) => {
    try {
      db.collection("textbooks")
        .where("uid", "==", uid)
        .get()
        .then(result => {
          resolve(result);
        });
    } catch (e) {
      reject();
    }
  });
}

export function searchAll(query) {
  query = query.toLowerCase();
  return new Promise((resolve, reject) => {
    try {
      db.collection("textbooks")
        .where("tags." + query, "==", true)
        .get()
        .then(result => {
          resolve(result);
        });
    } catch (e) {
      reject();
    }
  });
}

export function searchUser(query, uid) {
  query = query.toLowerCase();
  return new Promise((resolve, reject) => {
    try {
      db.collection("textbooks")
        .where("uid", "==", uid)
        .where("tags." + query, "==", true)
        .get()
        .then(result => {
          resolve(result);
        });
    } catch (e) {
      reject();
    }
  });
}

export function deleteFromDB(tbID) {
  new Promise((resolve, reject) => {
    // get user
    var user = auth.currentUser;
    console.log(tbID);
    if (user) {
      // get storageId
      db.collection("textbooks")
        .doc(tbID)
        .get()
        .then(result => {
          var data = result.data();
          if (data.uid !== user.providerData[0].uid) {
            console.log("This action is forbidden");
            reject(false);
            return;
          }
          var bookImgURL = data.imageURL;
          var book_id = bookImgURL.slice(72, -53);
          const storageRef = firebase.storage().ref();
          var imageRef = storageRef.child(book_id);
          imageRef
            .delete()
            .then(function() {
              // delete from database
              db.collection("textbooks")
                .doc(tbID)
                .delete()
                .then(() => {
                  resolve(true);
                });
            })
            .catch(function(error) {
              console.log("Error: Cannot delete from storage");
              reject(false);
              return;
            });
          bookImgURL = result.data().imageURL;
        });
      // delete from storage
    } else {
      console.log("This action is forbidden");
      reject(false);
      return;
    }
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
