const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning.utikq.mongodb.net/?retryWrites=true&w=majority&appName=learning`
  )
    .then((client) => {
      console.log("connected to MongoDB");
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
