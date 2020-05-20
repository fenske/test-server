const admin = require('firebase-admin');

function fromB64(string) {
  return Buffer.from(string, 'base64').toString();
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fromB64(process.env.GCLOUD_CREDENTIALS)))
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