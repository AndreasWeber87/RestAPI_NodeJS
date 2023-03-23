"use strict";

const Pool = require('pg').Pool

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

const getGemeinde = async (req, res) => {
    let client = null;

    try {
        client = await pool.connect();
        const resDB = await client.query({
            rowMode: 'array',
            text: `SELECT gemeindename FROM public.gemeinde WHERE gkz=${req.query.id} LIMIT 1`,
        });

        res.json({"gemeindename": resDB.rows[0]});
    } catch (err) {
        console.log(err.stack);
        res.writeHead(500, {'Content-Type' : 'application/json'});
        res.end(`{"message": "${err.stack}"}`.replace("\n", "\\n"));
    }
    finally {
        if (client !== null) {
            await client.end();
            await client.release();
        }
    }
};

module.exports = {
    getGemeinde,
}
