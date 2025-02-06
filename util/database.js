const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.utikq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
    .then((result) => {
      console.log("connected to MongoDB");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
