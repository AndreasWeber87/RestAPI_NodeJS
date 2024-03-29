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

// configure the API endpoints
api.get('/', queries.home);
api.post('/createTable', queries.createTable);
api.post('/addStreet', queries.addStreet);
api.put('/changeStreet/:skz', queries.changeStreet);
api.get('/getStreet', queries.getStreet);
api.delete('/deleteStreet/:skz', queries.deleteStreet);

api.listen(8000, () => {
  console.log("Server started on port 8000...");
  console.log("");
  console.log("Possible calls:");
  console.log("GET: http://localhost:8000/");
  console.log("");
  console.log("POST: http://localhost:8000/createTable");
  console.log("	BODY:");
  console.log("");
  console.log("POST: http://localhost:8000/addStreet");
  console.log(" HEADER: Content-Type: application/json");
  console.log("	BODY: {\"skz\":108711,\"streetname\":\"Andromedastraße\"}");
  console.log("");
  console.log("PUT: http://localhost:8000/changeStreet/108711");
  console.log("	HEADER: Content-Type: application/json");
  console.log("	BODY: {\"streetname\":\"Andromedastraße2\"}");
  console.log("");
  console.log("GET: http://localhost:8000/getStreet?skz=108711");
  console.log("");
  console.log("DELETE: http://localhost:8000/deleteStreet/108711");
});
