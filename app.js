const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { NOT_FOUND } = require("./constants/errorConstants");

const contactsRouter = require("./routes/api/contactsRouter");
const usersRouter = require("./routes/api/usersRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

mongoose
  .connect(process.env.MONGO_URL)
  .then((connection) => {
    console.log(" 🚀 Database connection successful!!!");
  })
  .catch((err) => {
    console.log("Mongoose connect Error", err.message);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: NOT_FOUND,
    status: "error",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    status: "error",
  });
});

module.exports = app;
