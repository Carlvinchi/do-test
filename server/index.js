const express = require("express");
require("dotenv").config();
require("express-async-errors");

require("./startup/errors")();

const path = require('path');

const app = express();


// Have Node serve the files for our built React app
//app.use(express.static(path.resolve(__dirname, '../client/build')));

if(process.env.NODE_ENV === "production"){
  //app.use(express.static('../client/build'));
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/*', (req, res) =>{

    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  } );
}


require("./startup/middleware")(app);
require("./startup/prod")(app);
require("./startup/routes")(app);
require("./startup/db")();
const server = require("./startup/port")(app);

// All other GET requests not handled before will return our React app
/*
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  */


module.exports = server;
