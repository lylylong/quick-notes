// This js file is the main file, in the root project directory, our server will run from

// require Express.js & routes at the top of the file
const express = require("express");
require("./routes/routes");
// const apiRoutes = require("./routes/apiRoutes")(app);
// const htmlRoutes = require("./routes/htmlRoutes")(app);

//// Setting up server / instance of express
const app = express(); //
const PORT = process.env.PORT || 3000;

// Add Middleware So the Application Can Accept POST DATA
//// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//// takes incoming POST JSON data and parses it into the req.body JavaScript object
app.use(express.json());
////more middleware to our serve
app.use(express.static("public"));
////telling the server that any time a client navigates to <ourhost>/api
////the app will use the router we set up in apiRoutes or htmlRoutes
// app.use("/api", apiRoutes);
//// If / is the endpoint, then the router will serve back our HTML routes
// app.use("/", htmlRoutes);

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

//// Setting up the server listener
app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});
