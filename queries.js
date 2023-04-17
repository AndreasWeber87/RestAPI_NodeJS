"use strict";

const Pool = require('pg').Pool;

const pool = new Pool({
    //host: '127.0.0.1',
    host: '192.168.0.2', // container ip
    port: 5432,
    user: 'postgres',
    password: 'xsmmsgbAMfIOIWPPBrsc',
    database: 'ogd',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// GET: http://localhost:8000/
const home = (req, res) => {
    try {
        res.json({"message": "Hello World! I'm the NodeJS API."});
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

// POST: http://localhost:8000/createTable
// BODY:
const createTable = async (req, res) => {
    try {
        const sqlQuery = `DROP TABLE IF EXISTS public.strasse;

CREATE TABLE IF NOT EXISTS public.strasse
(
    skz integer NOT NULL,
    strassenname character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT strasse_pkey PRIMARY KEY (skz)
)`;
        pool.query(sqlQuery,
            (error) => {
                if (error) {
                    throw error;
                }
                res.sendStatus(201).json({"message": "Table created successfully."});
            });
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

// POST: http://localhost:8000/addStrasse
// HEADER: Content-Type: application/json
// BODY: {"skz":108711,"strassenname":"Andromedastraße"}
const addStrasse = async (req, res) => {
    try {
        pool.query("INSERT INTO public.strasse(skz, strassenname) VALUES ($1, $2);", [req.body.skz, req.body.strassenname],
            (error) => {
                if (error) {
                    throw error;
                }
                res.sendStatus(201).json({"message": "Street added successfully."});
            });
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

// PUT: http://localhost:8000/changeStrasse/108711
// HEADER: Content-Type: application/json
// BODY: {"strassenname":"Andromedastraße2"}
const changeStrasse = async (req, res) => {
    try {
        pool.query("UPDATE public.strasse SET strassenname=$1 WHERE skz=$2;", [req.body.strassenname, req.params.skz],
            (error) => {
                if (error) {
                    throw error;
                }
                res.json({"message": "Street changed successfully."});
            });
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

// GET: http://localhost:8000/getStrasse?skz=108711
const getStrasse = async (req, res) => {
    try {
        const skz = parseInt(req.query.skz, 10);
        pool.query("SELECT strassenname FROM public.strasse WHERE skz=$1 LIMIT 1;", [skz],
            (error, results) => {
                if (error) {
                    throw error;
                }
                if (results.rows.length === 0) {
                    res.sendStatus(404).json({"message": "No street found."});
                    return;
                }
                res.json({ "skz": skz, "strassenname": results.rows[0].strassenname });
            });
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

// DELETE: http://localhost:8000/deleteStrasse/108711
const deleteStrasse = async (req, res) => {
    try {
        pool.query("DELETE FROM public.strasse WHERE skz=$1;", [req.params.skz],
            (error) => {
                if (error) {
                    throw error;
                }
                res.json({"message": "Street deleted successfully."});
            });
    } catch (err) {
        console.log(err.stack);
        res.sendStatus(500);
    }
};

module.exports = {
    home,
    createTable,
    addStrasse,
    changeStrasse,
    getStrasse,
    deleteStrasse
}
