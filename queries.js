"use strict";

const home = (req, res) => {
    try {
        res.json({"message": "Hello World! I'm the NodeJS API."});
    }
    catch(err) {
        console.log(err.stack);
        res.writeHead(500, {'Content-Type' : 'application/json'});
        res.end(`{"message": "${err.stack}"}`.replace("\n", "\\n"));
    }
}

const sayHelloGet = (req, res) => {
    try {
        res.json({"message":`Hello ${req.query.name}! I'm the NodeJS API.`});
    } catch (err) {
        console.log(err.stack);
        res.writeHead(500, {'Content-Type' : 'application/json'});
        res.end(`{"message": "${err.stack}"}`.replace("\n", "\\n"));
    }
}

const sayHelloPost = (req, res) => {
    try {
        res.json({"message":`Hello ${req.body.name}! I'm the NodeJS API.`});
    } catch (err) {
        console.log(err.stack);
        res.writeHead(500, {'Content-Type' : 'application/json'});
        res.end(`{"message": "${err.stack}"}`.replace("\n", "\\n"));
    }
}

module.exports = {
    home,
    sayHelloGet,
    sayHelloPost,
}
