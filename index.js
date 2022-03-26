require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("express");

const app = express();

const DB = process.env.DB_SECRET;

mongoose
  .connect(DB)
  .then(() => console.log("connected successfully to db"))
  .catch((err) => console.log("no connection"));

const dataSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  featured: Boolean,
});

var Data = mongoose.model("future-amazon-db", dataSchema, "amazon-db");
// port
const port = process.env.PORT || 3000;

app.listen(port);

// complete product list
app.get("/", (req, res) => {
  Data.find().then((data, error) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(data);
  });
});

// only featured products
app.get("/featured", (req, res) => {
  Data.find({ featured: true }).then((data, error) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(data);
  });
});

// only selected products
app.get("/:id", (req, res) => {
  Data.findById(req.params.id, function (err, user) {
    if (err) {
      console.log("error");
      res.send({ message: "Item Not Found" });
      return;
    }
    res.send(user);
    console.log("no error");
  });
});
