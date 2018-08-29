const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getData = functions.https.onRequest((req, res) => {
    const params = req.url.split("/");
    const uid = params[2];
    return admin.database().ref('store/textbooks/'+uid).once('value',(snapshot) => {
        res.send(
            JSON.stringify(snapshot.val())
        );
    })
});