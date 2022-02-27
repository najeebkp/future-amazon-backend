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

app.get("/", (req, res) => {
  res.send("Hello World");
});
