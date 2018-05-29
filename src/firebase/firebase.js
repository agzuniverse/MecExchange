import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDw_Tpy96dXGAd3z65s_s98pdd007MPysU",
  authDomain: "mecbookswatch.firebaseapp.com",
  projectId: "mecbookswatch",
  databaseURL: "https://mecbookswatch.firebaseio.com",
  storageBucket: "mecbookswatch.appspot.com"
};

firebase.initializeApp(config);

export function addToStorage(file, data) {
  return new Promise((resolve, reject) => {
    function guid() {
      return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    }
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    const uuid = guid();

    const storageRef = firebase.storage().ref();
    const storageAdd = storageRef.child(uuid + file.name);

    storageAdd.put(file).then(snapshot => {
      data.imageURL = snapshot.downloadURL;
      //console.log(data);

      const database = firebase.database();
      database
        .ref(`store/textbooks/${data.uid}`)
        .push(data)
        .then(snapshot => {
          console.log("Book added successfully");
          resolve();
        });
    });
  });
}

export function readFromStorage(uid) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`store/textbooks/${uid}`)
      .once("value", snapshot => {
        resolve(snapshot.val());
      });
  });
}

export function searchAll(query) {
  query = query.toLowerCase();
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("store/textbooks/")
      .once("value", snapshot => {
        const data = snapshot.val();
        const results = [];
        let flag = true;
        for (const i in data) {
          for (const j in data[i]) {
            for (const tag in data[i][j].tags) {
              if (data[i][j].tags[tag].toLowerCase().includes(query)) {
                flag = true;
                for (const k in results) {
                  if (results[k] === data[i][j]) {
                    flag = false;
                  }
                }
                if (flag) {
                  results.push(data[i][j]);
                }
              }
            }
          }
        }
        resolve(results);
      });
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
