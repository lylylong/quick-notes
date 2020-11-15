// const store = require("../db/store");
const fs = require("fs");
const uuid = require("uuid");
// const router = require("express").Router();
module.exports = (app) => {
  function readNote() {
    return fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
    });
  }

  function whiteNote(note) {
    return fs.writeFile("db/db.json", JSON.stringify(note));
  }

  function getNotes() {
    return this.readNote().then((notes) => {
      let parseNote;
      try {
        parseNote = [].concat(JSON.parse(notes));
      } catch (err) {
        parseNote = [];
      }
      return parseNote;
    });
  }

  function addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      alert("Title / Text cannot be empty!");
    }

    const newNote = { title, text, id: uuid.v1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.whiteNote(updatedNotes))
      .then(() => newNote);
  }

  function removeNote(id) {
    return this.getNotes()
      .then((noteArray) => noteArray.filter((note) => note.id !== id))
      .then((updatedNotes) => this.whiteNote(updatedNotes));
  }

  app.get("/notes", (req, res) => {
    getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  });

  app.post("/notes", (req, res) => {
    addNote(req.body)
      .then((note) => {
        res.json(note);
        //   updateDb();
      })
      .catch((err) => res.status(500).json(err));
  });

  app.delete("/notes/:id", (req, res) => {
    removeNote(req.params.id)
      .then(() => {
        res.json({ ok: true });
        //   updateDb();
      })
      .catch((err) => res.status(500).json(err));
  });

  //updates the json file whenever a note is added or deleted
  // function updateDb() {
  //   fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
  //     if (err) throw err;
  //     return true;
  //   });
  // }
};
