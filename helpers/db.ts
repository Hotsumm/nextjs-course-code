import { MongoClient } from 'mongodb';

export async function connectMongoDB() {
  const URL =
    'mongodb+srv://hotsumm:SP5KlctDgWmExOzR@cluster0.gh1i0kd.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(URL);
  await client.connect();
  console.log('Connected successfully to server');
  return client;
}

export async function insertDocument(
  client: any,
  dbName: string,
  collectionName: string,
  document: any
) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

export async function getDocument(
  client: any,
  dbName: string,
  collectionName: string,
  sort: any,
  filter = {}
) {
  const db = client.db(dbName);
  const result = db
    .collection(collectionName)
    .find(filter)
    .sort(sort)
    .toArray();

  return result;
}
