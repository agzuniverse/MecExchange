/* eslint-disable */
import * as firebase from "firebase";
import "firebase/firestore";

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
        db.collection("textbooks")
          .add(data)
          .then(dataSnapshot => {
            console.log(`Book added successfully dataSnapshot ${dataSnapshot}`);
            resolve();
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
        .where("owner", "==", uid)
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
  return new Promise((resolve, reject) => {
    try {
      db.collection("textbooks")
        .where("title", "==", query)
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
  return new Promise((resolve, reject) => {
    try {
      db.collection("textbooks")
        .where("owner", "==", uid)
        .where("title", "==", query)
        .get()
        .then(result => {
          resolve(result);
        });
    } catch (e) {
      reject();
    }
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
