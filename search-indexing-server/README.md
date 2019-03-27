# Post new Book
`POST https://secret-escarpment-95373.herokuapp.com/postbook`<br />
This endpoint will also perform validation on the data and return with Internal Server Error 500 and the error message
```
{
  "idToken":"ID token obtained from firebase.auth().currentUser.getIdToken(true)",
  "data":"textbook data object"
}
```

# Del book 
`POST https://secret-escarpment-95373.herokuapp.com/deletebook`
```
{
  "idToken":"ID token obtained from firebase.auth().currentUser.getIdToken(true)",
  "bookID":"ID of the book to be deleted"
}
```

