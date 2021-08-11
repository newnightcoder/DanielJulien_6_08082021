import "dotenv/config";
import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

/*****************************************
 DB connexion with mongoose😎  = 1 liner 
******************************************/

mongoose.connect(process.env.DB_CONNEXION, options, () =>
  console.log("DB connected!🚀")
);

/************************************
  DB connexion with mongoDB script😭
*************************************/

// MongoClient.connect(uri, options, (err, client) => {
//   if (err) return console.log(err, "oops! connection failed!😭");
//   console.log("connexion successful!🚀");
//   // const db = client.db(dbName);
// });
