const express = require("express");
const debug = require("debug")("app");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Env settings

if (process.env.ENV === "test") {
  debug(`${"this is a test"}`);
  const db = mongoose.connect("mongodb://localhost/bookAPI_test");
} else {
  debug(`${"this is development"}`);
  const db = mongoose.connect("mongodb://localhost/bookAPI_dev");
}

// db config
const PORT = process.env.PORT || 3000;

// Models

// Routes

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Assign Routers to routes
// app.use('/', indexRouter)

app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

app.listen(PORT, () => {
  debug(`Running in port ${PORT}`);
});
