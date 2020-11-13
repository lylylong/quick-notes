// This js file is the main file, in the root project directory, our server will run from

const [db] = require("./db/db");

// const path = require("path");

// require Express.js at the top of the file
const express = require("express");

// assign express() to the app variable so that we can later chain on methods to the Express.js server
//// Setting up the server 1/2
const app = express(); // instance of express
const PORT = process.env.PORT || 3000;

app.get("/api/db", (req, res) => {
  res.json(db);
});

//// Setting up the server 2/2
app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});
