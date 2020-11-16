const fs = require("fs");
const util = require("util");

const uuid = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  readNote() {
    return readFileAsync("db/db.json", "utf8");
  }
  whiteNote(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
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
  addNote(note) {
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
  removeNote(id) {
    return this.getNotes()
      .then((noteArray) => noteArray.filter((note) => note.id !== id))
      .then((updatedNotes) => this.whiteNote(updatedNotes));
  }
}

module.exports = new Store();
