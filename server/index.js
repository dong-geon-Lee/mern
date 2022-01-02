const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use("/snippet", require("./routers/snippetRouter"));

app.listen(port, () => console.log(`Server started on port ${port}`));

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connect to MongoDB...");
  }
);
