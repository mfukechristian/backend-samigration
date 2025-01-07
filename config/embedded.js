import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const collection = client
  .db(process.env.MONGO_DB_NAME)
  .collection(process.env.MONGO_COLLECTION_NAME);

export default collection;
