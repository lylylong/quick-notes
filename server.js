// This js file is the main file, in the root project directory, our server will run from

// const [db] = require("./db/db");

// const path = require("path");

// require Express.js at the top of the file
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// assign express() to the app variable so that we can later chain on methods to the Express.js server
//// Setting up the server 1/2
const app = express(); // instance of express
const PORT = process.env.PORT || 3000;

// // const fs = require("fs");

// Add Middleware So the Application Can Accept POST DATA
//// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//// takes incoming POST JSON data and parses it into the req.body JavaScript object
app.use(express.json()); //insomnia will use JSON to post & building server
// //more middleware to our serve
app.use(express.static("public"));
// //telling the server that any time a client navigates to <ourhost>/api
// //the app will use the router we set up in apiRoutes
// // If / is the endpoint, then the router will serve back our HTML routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// app.get("/api/db", (req, res) => {
//   res.json(db);
// });
// app.post("/api/db", (req, res) => {
//   //// set id
//   req.body.id = "";
//   console.log(req.body);
//   res.json(req.body);
// });

// function findById(id, notesArray) {
//   const result = notesArray.filter((notesArray) => notesArray[i].id === id)[i];
//   return result;
// }

// function createNewNote(body, notesArray) {
//   console.log(body);
//   // our function's main code will go here!

//   // return finished code to post route for response
//   return body;
// }

//// Setting up the server 2/2
app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});
