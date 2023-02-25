"use strict";

const home = (req, res) => {
    try {
        res.json({message: "Hello World! I'm the NodeJS API."});
    }
    catch(err) {
        console.log("Error occurred: " + err);
        res.statusMessage = err;
        res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
}

const sayHelloGet = (req, res) => {
    try {
        res.json({message:`Hello ${req.query.name}! I'm the NodeJS API.`});
    } catch (err) {
        console.log("Error occurred: " + err);
        res.statusMessage = err;
        res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
}

const sayHelloPost = (req, res) => {
    try {
        res.json({message:`Hello ${req.body.name}! I'm the NodeJS API.`});
    } catch (err) {
        console.log("Error occurred: " + err);
        res.statusMessage = err;
        res.status(500).end(); // on an error send http code 500 (= Internal Server Error) to the client
    }
}

module.exports = {
    home,
    sayHelloGet,
    sayHelloPost,
}
