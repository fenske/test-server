import faunadb, { query as q } from 'faunadb';

const { FAUNADB_SECRET : secret }  = process.env;

let client;

if (secret) {
  client = new faunadb.Client({ secret });
}

export default async (req, res) => {
  try {

    if (!client) {
      return [];
    }

    await client.query(
      q.Create(
        q.Collection('test'),
        { data: { results: req.body.results } },
      )
    )

    res.json({ result: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};