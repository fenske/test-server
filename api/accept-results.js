const admin = require('firebase-admin');

// TODO For tomorrow
// DONE. Come up with a quick and reasonable data model 10 mins
// Write the results to a user space in Firestore 10 mins

//TODO: Next iteration
// 1. Hook up a trigger on Firestore write when a test result arrives. 20 mins
// 2. Store the basic stats about whether the challenge is done true/false. 15 mins
// 3. Design a data model. 20 mins
// 4. Add a api-key check: 20 mins

function fromB64(string) {
  return Buffer.from(string, 'base64').toString();
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fromB64(process.env.GCLOUD_CREDENTIALS)))
});

let db = admin.firestore();

export default async (req, res) => {
  try {
    //TODO: validate user

    let docRef = db.collection(`users/${req.body.user}/runs`).add(
      {
        challenge: req.body.challenge,
        results: req.body.results,
        created_at: Date.now()
      }
    );

    res.json({result: 'ok'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}