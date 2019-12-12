"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import express module
var express = require("express");
var metrics_1 = require("./metrics");
var path = require("path");
var bodyparser = require("body-parser");
//create a server
var app = express();
var port = process.env.PORT || '8080';
app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', __dirname + "/../view");
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ "extended": false }));
//route 1
app.get('/', function (req, res) {
    res.write('Hello world');
    res.end();
});
//route 2
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
//declare a instance of MetricsHandler
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
//route 3 : write metrics (key, value) in db
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send("Ya qqch");
    });
});
//route 4 : get all metrics
app.get('/metrics/', function (req, res) {
    dbMet.getAll(function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
    });
});
//route 5 : get metrics from id
app.get('/metrics/:id', function (req, res) {
    dbMet.getOne(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
    });
});
//route 6 : delete one metric from an ID
app.delete('/metrics/:id/:timestamp', function (req, res) {
    dbMet.deleteOneFromID(req.params.id, req.params.timestamp, function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
        dbMet.delete(result, req.params.id);
    });
});
//route 7 : delete metrics of user
app.delete('/metrics/:id', function (req, res) {
    dbMet.deleteAllFromID(req.params.id, function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result);
        dbMet.delete(result, req.params.id);
    });
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
