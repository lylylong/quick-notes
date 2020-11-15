const fs = require("fs");

const uuid = require("uuid");

class Store {
  readNote() {
    return fs.readFile("db/db.json", (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
    });
  }
  whiteNote(note) {
    return fs.writeFile("db/db.json", JSON.stringify(note));
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
  addNote() {
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
