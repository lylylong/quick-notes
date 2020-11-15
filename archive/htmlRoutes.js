// const router = require("express").Router();
const path = require("path");

const htmlRoutes = function (app) {
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};

module.exports = htmlRoutes(app);
