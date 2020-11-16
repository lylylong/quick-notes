const express = require("express");

//// Setting up server / instance of express
const app = express(); //
const PORT = process.env.PORT || 3000;

//// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//// takes incoming POST JSON data and parses it into the req.body JavaScript object
app.use(express.json());
////more middleware to our serve
app.use(express.static("public"));

////Require the routes
require("./routes/routes")(app);

//// Setting up the server listener
app.listen(PORT, () => {
  console.log(`API server on port ${PORT}!`);
});
