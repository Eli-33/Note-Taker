const fs = require('fs');
const path = require("path");
const util = require('util');

const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// Routing
module.exports = app => {

  // API GET Requests
  app.get("/api/notes", function(req, res) {
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
    .then(function (note) {
        return res.json(JSON.parse(note));
    });

  });
//  Post Requests
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
        .then(function (note) {
            notes = JSON.parse(note);
            if (newNote.id || newNote.id === 0) {
                let currNote = notes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                notes.push(newNote);
            }
            writefileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
                .then(function () {
                    console.log("the note is writen");
                })
        });
    res.json(newNote);
});
// Delete Request
app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
        .then(function (note) {
            notes = JSON.parse(note);
            notes.splice(id, 1);
            writefileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
                .then(function () {
                    console.log("Deleted db.json");
                })
        });
    res.json(id);
});
}
 