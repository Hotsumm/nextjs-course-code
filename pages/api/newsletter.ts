import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongoDB, insertDocument } from '../../helpers/db';

const DB_NAME = 'events';
const COLLECTION_NAME = 'newsletter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;
    try {
      client = await connectMongoDB();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, DB_NAME, COLLECTION_NAME, { email });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }
    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}
