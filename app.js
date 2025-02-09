const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("67a7cfbd64be911aa271fbf3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning.utikq.mongodb.net/?retryWrites=true&w=majority&appName=learning`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "sabareesan",
          email: "sabareesanrajkumar05@gmail.com",
          cart: { items: [] },
        });
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
