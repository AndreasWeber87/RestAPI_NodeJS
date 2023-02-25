"use strict";

//let connected = false;
const { Pool } = require('pg')

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
        await client.query(`SELECT gemeindename FROM public.gemeinde WHERE gkz=${req.query.id} LIMIT 1`, (err, res) => {
            const resDB = err ? err.stack : res.rows[0].gemeindename;
            res.json({gemeindename: resDB});
            console.log({gemeindename: resDB})
            //res.end()
        });
    } catch (err) {
        console.log("Error occurred: " + err);
        res.statusMessage = err;
        res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
    // finally {
    //     pool.release()
    // }
};

module.exports = {
    getGemeinde,
}