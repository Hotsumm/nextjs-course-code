import type { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongoDB,
  getDocument,
  insertDocument,
} from '../../../helpers/db';

const DB_NAME = 'events';
const COLLECTION_NAME = 'comments';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectMongoDB();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, text, name } = req.body.commentData;
    const newComment: any = {
      eventId,
      email,
      text,
      name,
    };

    let result;
    try {
      result = await insertDocument(
        client,
        DB_NAME,
        COLLECTION_NAME,
        newComment
      );
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'added comment', newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inseting comment failed!' });
      client.close();
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const commentList = await getDocument(
        client,
        DB_NAME,
        COLLECTION_NAME,
        {
          _id: -1,
        },
        { eventId: eventId }
      );
      res.status(201).json({ commentList });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }
  client.close();
}
