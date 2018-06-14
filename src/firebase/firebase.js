/* eslint-disable */
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
        const database = firebase.database();
        database
          .ref(`store/textbooks/${data.uid}`)
          .push(data)
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
      firebase
        .database()
        .ref(`store/textbooks/${uid}`)
        .once("value", snapshot => {
          resolve(snapshot.val());
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
    } catch (e) {
      reject();
    }
  });
}

<<<<<<< 2f11a012f8f2f1d57f251d4a81ff6f9b30acebfc
export function searchUser(query, uid) {
=======
export function searchUser(query,uid) {
>>>>>>> Search func added to userpage
  query = query.toLowerCase();
  return new Promise((resolve, reject) => {
    try {
      firebase
        .database()
        .ref(`store/textbooks/${uid}`)
        .once("value", snapshot => {
          const data = snapshot.val();
          console.log(data);
          const results = [];
          let flag = true;
          for (const i in data) {
<<<<<<< 2f11a012f8f2f1d57f251d4a81ff6f9b30acebfc
            console.log(i, data[i]);
            for (const tag in data[i].tags) {
              if (data[i].tags[tag].toLowerCase().includes(query)) {
                flag = true;
                for (const k in results) {
                  if (results[k] === data[i]) {
                    flag = false;
                  }
                }
                if (flag) {
                  results.push(data[i]);
                }
              }
            }
          }
=======
              console.log(i,data[i]);
              for (const tag in data[i].tags) {
                if (data[i].tags[tag].toLowerCase().includes(query)) {
                  flag = true;
                  for (const k in results) {
                    if (results[k] === data[i]) {
                      flag = false;
                    }
                  }
                  if (flag) {
                    results.push(data[i]);
                  }
                }
              }
            }
>>>>>>> Search func added to userpage
          resolve(results);
        });
    } catch (e) {
      reject();
    }
  });
}

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
