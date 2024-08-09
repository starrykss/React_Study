// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from 'mongodb';

import { mongodbKey } from '../../utils/keys';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // 사전 렌더링되기 때문에 클라이언트 측에서 접속 경로를 확인할 수 없다. (안전)
    const client = await MongoClient.connect(mongodbKey);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne({ data });

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
