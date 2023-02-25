"use strict";

//let connected = false;
const Pool = require('pg').Pool

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'xsmmsgbAMfIOIWPPBrsc',
    database: 'ogd',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const getGemeinde = async (req, res) => {
    const client = await pool.connect()

    try {
        const resDB = await client.query({
            rowMode: 'array',
            text: `SELECT gemeindename FROM public.gemeinde WHERE gkz=${req.query.id} LIMIT 1`,
        });

        res.json({gemeindename: resDB.rows[0]});
    } catch (err) {
        console.log("Error occurred: " + err);
        res.statusMessage = err;
        res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
    finally {
        await client.end();
    }
};

module.exports = {
    getGemeinde,
}