import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // loads .env

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is missing in .env');
}

const client = new MongoClient(process.env.MONGODB_URI);

// Connect once and reuse
const clientPromise = client.connect();

export default clientPromise;
