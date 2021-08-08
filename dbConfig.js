import {} from "dotenv/config";
import MongoClient from "mongodb";

const dbName = "Hot-Takes";
const uri = `mongodb+srv://nightcoder:${process.env.MONGODB_PASS}@hot-takes.j354e.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

MongoClient.connect(uri, options, (err, client) => {
  if (err) return console.log(err, "oops! connection failed!😭");
  console.log("connexion successful!🚀");
  // const db = client.db(dbName);
});
