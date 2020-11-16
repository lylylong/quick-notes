const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

module.exports = (app) => {
  // read & parse db json
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);

    // Setup the get route
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

    // Setup the post route
    app.post("/api/notes", function (req, res) {
      // Add uuid to every new note, save to db.json
      //   console.log(req.body);
      let newId = { id: uuid.v1() };
      let newNote = req.body;
      Object.assign(newNote, newId);
      console.log(newNote);
      notes.push(newNote);
      updateDbJson();
      console.log("New note: " + newNote.title);
    });

    // retrieves a note with its uuid
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });

    // deletes a note with its uuid
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDbJson();
      console.log("You deleted a note");
    });

    // display notes.html
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // display index.html when all other routes are accessed
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //updates the database json
    function updateDbJson() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
