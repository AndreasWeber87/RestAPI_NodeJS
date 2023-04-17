"use strict";

// Sources:
// http://expressjs.com
// https://node-postgres.com/
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

const bodyParser = require("body-parser");
const express = require("express");
const queries = require('./queries');

const api = express();

// parse application/json
api.use(bodyParser.json());

api.get('/', queries.home);
api.post('/createTable', queries.createTable);
api.post('/addStrasse', queries.addStrasse);
api.put('/changeStrasse/:skz', queries.changeStrasse);
api.get('/getStrasse', queries.getStrasse);
api.delete('/deleteStrasse/:skz', queries.deleteStrasse);

api.listen(8000, () => {
//api.listen(10000, () => {
  console.log("Server started on port 8000...");
  console.log("");
  console.log("Possible calls:");
  console.log("GET: http://localhost:8000/");
  console.log("");
  console.log("POST: http://localhost:8000/createTable");
  console.log("	BODY:");
  console.log("");
  console.log("POST: http://localhost:8000/addStrasse");
  console.log(" HEADER: Content-Type: application/json");
  console.log("	BODY: {\"skz\":108711,\"strassenname\":\"Andromedastraße\"}");
  console.log("");
  console.log("PUT: http://localhost:8000/changeStrasse/108711");
  console.log("	HEADER: Content-Type: application/json");
  console.log("	BODY: {\"strassenname\":\"Andromedastraße2\"}");
  console.log("");
  console.log("GET: http://localhost:8000/getStrasse?skz=108711");
  console.log("");
  console.log("DELETE: http://localhost:8000/deleteStrasse/108711");
});
