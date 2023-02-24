"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const worker = () => {
  const api = express();

  api.use(cors());

  // parse application/x-www-form-urlencoded
  api.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  api.use(bodyParser.json());

  api.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      res.end(`{"message":"Hello World! I'm the NodeJS API."}`);
    }
    catch(err) {
      console.log("Error occurred: " + err);
      res.statusMessage = err;
      res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
  });

  api.get('/hello', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    try {
      res.end(`{"message":"Hello ${req.query.name}! I'm the NodeJS API."}`);
    }
    catch(err) {
      console.log("Error occurred: " + err);
      res.statusMessage = err;
      res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
  });

  api.post("/hello", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      res.end(`{"message":"Hello ${req.body.name}! I'm the NodeJS API."}`);
    }
    catch(err) {
      console.log("Error occurred: " + err);
      res.statusMessage = err;
      res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
  });

  api.listen(7000, () => {
    console.log("Server started on port 7000...");
    console.log("");
    console.log("Possible calls:");
    console.log("http://localhost:7000/");
    console.log("GET: http://localhost:7000/hello?name=ic20b050");
    console.log("POST: http://localhost:7000/hello  name=ic20b050");
  });
}

worker();