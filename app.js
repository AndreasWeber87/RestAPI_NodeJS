"use strict";

// Sources:
// http://expressjs.com
// https://node-postgres.com/
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

const bodyParser = require("body-parser");
const express = require("express");
const queries = require('./queries');
const queriesDB = require('./queriesDB');

const api = express();

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({extended: false}));
// parse application/json
api.use(bodyParser.json());

api.get('/', queries.home);
api.get('/getGemeinde', queriesDB.getGemeinde);

api.listen(8000, () => {
  console.log("Server started on port 8000...");
  console.log("");
  console.log("Possible calls:");
  console.log("http://localhost:8000/");
  console.log("GET: http://localhost:8000/getGemeinde?id=10101");
});
