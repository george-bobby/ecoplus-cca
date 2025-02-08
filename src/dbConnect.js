import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("Environment variable MONGO_URI is not defined");
}

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
});

let clientPromise;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
