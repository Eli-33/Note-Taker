const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require routes file
require("./routes/ApiR")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
