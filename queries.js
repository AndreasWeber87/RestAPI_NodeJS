"use strict";

const Pool = require('pg').Pool;

const pool = new Pool({
    host: '192.168.0.2',
    port: 5432,
    user: 'postgres',
    password: 'xsmmsgbAMfIOIWPPBrsc',
    database: 'ogd',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// GET: http://localhost:8000/
const home = (req, res) => {
    res.json({"message": "Hello World! I'm the NodeJS API."});
};

// POST: http://localhost:8000/createTable
// BODY:
const createTable = async (req, res) => {
    const sqlQuery = `DROP TABLE IF EXISTS public.strasse;

CREATE TABLE public.strasse
(
    skz integer NOT NULL,
    strassenname character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT strasse_pkey PRIMARY KEY (skz)
)`;

    pool.query(sqlQuery,
        (error) => {
            if (error) {
                console.log(error.stack);
                res.status(500).send("");
                return;
            }
            res.status(201).json({"message": "Table created successfully."});
        });
};

// POST: http://localhost:8000/addStreet
// HEADER: Content-Type: application/json
// BODY: {"skz":108711,"streetname":"Andromedastraße"}
const addStreet = async (req, res) => {
    pool.query("INSERT INTO public.strasse(skz, strassenname) VALUES ($1, $2);", [req.body.skz, req.body.streetname],
        (error) => {
            if (error) {
                console.log(error.stack);
                res.status(500).send("");
                return;
            }
            res.status(201).json({"message": "Street added successfully."});
        });
};

// PUT: http://localhost:8000/changeStreet/108711
// HEADER: Content-Type: application/json
// BODY: {"streetname":"Andromedastraße2"}
const changeStreet = async (req, res) => {
    pool.query("UPDATE public.strasse SET strassenname=$1 WHERE skz=$2;", [req.body.streetname, req.params.skz],
        (error, results) => {
            if (error) {
                console.log(error.stack);
                res.status(500).send("");
                return;
            }
            if (results.rowCount === 0) {
                res.json({"message": "ID not found."});
                return;
            }
            res.json({"message": "Street changed successfully."});
        });
};

// GET: http://localhost:8000/getStreet?skz=108711
const getStreet = async (req, res) => {
    const skz = parseInt(req.query.skz, 10);
    pool.query("SELECT strassenname FROM public.strasse WHERE skz=$1 LIMIT 1;", [skz],
        (error, results) => {
            if (error) {
                console.log(error.stack);
                res.status(500).send("");
                return;
            }
            if (results.rows.length === 0) {
                res.json({"message": "ID not found."});
                return;
            }
            res.json({"skz": skz, "streetname": results.rows[0].strassenname});
        });
};

// DELETE: http://localhost:8000/deleteStreet/108711
const deleteStreet = async (req, res) => {
    pool.query("DELETE FROM public.strasse WHERE skz=$1;", [req.params.skz],
        (error, results) => {
            if (error) {
                console.log(error.stack);
                res.status(500).send("");
                return;
            }
            if (results.rowCount === 0) {
                res.json({"message": "ID not found."});
                return;
            }
            res.json({"message": "Street deleted successfully."});
        });
};

module.exports = {
    home,
    createTable,
    addStreet,
    changeStreet,
    getStreet,
    deleteStreet
}
