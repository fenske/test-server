const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(process.env.GCLOUD_CREDENTIALS)
});

let db = admin.firestore();

export default (req, res) => {
  try {
    let docRef = db.collection('test').doc('test-doc');

    let setAda = docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });
    res.json({result: 'ok'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}