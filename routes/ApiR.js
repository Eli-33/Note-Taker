const fs = require('fs');
const dB = require ("../db/db");

// Routing
module.exports = app => {
 // Setup notes variable
 fs.readFile("db/db.json","utf8", (err, data) => {
  if (err) throw err;
  const note = JSON.parse(data);
 
  // API GET Requests
  app.get("/api/notes", function(req, res) {
    console.log(note);
    res.json(note);
  });
  
//  Post Requests
  app.post("/api/notes", function(req, res) {

      dB.push(req.body);
      updateDb();
      res.json("save");
  });

// Delete Request
app.delete("/api/notes/:id", function(req, res) {
  note.splice(req.params.id, 1);
  updateDb();
  console.log("Deleted note with id "+req.params.id);
});

 //updates the json file whenever a note is added or deleted
 function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(dB,'\t'),err => {
      if (err) throw err;
      return true;
    });
  }
});
}
 