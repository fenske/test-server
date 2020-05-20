const admin = require('firebase-admin');

function fromB64(string) {
  return Buffer.from(string, 'base64').toString();
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fromB64(process.env.GCLOUD_CREDENTIALS)))
});

let db = admin.firestore();

export default async (req, res) => {
  try {
    let docRef = db.collection('test').doc(req.body.user);

    await docRef.set({
      user: req.body.user,
      results: req.body.results
    });

    res.json({result: 'ok'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}