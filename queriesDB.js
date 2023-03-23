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
    try {
        pool.query(`SELECT gemeindename FROM public.gemeinde WHERE gkz=${req.query.id} LIMIT 1`, (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } catch (err) {
        console.log(err.stack);
        res.writeHead(500, {'Content-Type' : 'application/json'});
        res.end(`{"message": "${err.stack}"}`.replace("\n", "\\n"));
    }
};

module.exports = {
    getGemeinde,
}
