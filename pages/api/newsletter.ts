import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const URL =
  'mongodb+srv://hotsumm:SP5KlctDgWmExOzR@cluster0.gh1i0kd.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'newletter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email }: any = req.body;

    const client = new MongoClient(URL);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(DB_NAME);
    const collection = db.collection('emails');

    try {
      await collection.insertOne({ email });
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }

    res.status(201).json({ message: '등록 성공' });
  }
}
