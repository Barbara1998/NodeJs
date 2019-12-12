"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//not good
//import LevelDB = require('./leveldb')
//this.db = LevelDB.open(dbPath) : error on open solution:
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        //open database
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    //note for us: on a changé le type de id en string au lieu de number
    MetricsHandler.prototype.save = function (id, metrics, callback) {
        //stream that writes on the db
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + id + ":" + m.timestamp, value: m.value });
            console.log("metric:" + id + ":" + m.timestamp);
        });
        stream.end();
    };
    //get all metrics
    MetricsHandler.prototype.getAll = function (callback) {
        var metrics = [];
        //open up a readable stream
        this.db.createReadStream()
            //listen to the stream's 'data' event
            .on('data', function (data) {
            //retrieve the "3rd" part of the key
            var timestamp = data.key.split(':')[2];
            var metric = new Metric(timestamp, data.value);
            console.log("timestamp=" + metric.timestamp);
            console.log("value=" + metric.value);
            //all the metrics are in
            metrics.push(metric);
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(null, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            //send back all the metrics
            callback(null, metrics);
            console.log('Stream ended');
        });
    };
    //get one metric
    //compare id from the request
    MetricsHandler.prototype.getOne = function (id, callback) {
        var metrics = [];
        //open up a readable stream
        this.db.createReadStream()
            .on('data', function (data) {
            //take the "2nd" part of the key ==> id
            var user = data.key.split(':')[1];
            //compare here with the id
            if (id == user) {
                var timestamp = data.key.split(':')[2];
                var metric = new Metric(timestamp, data.value);
                metrics.push(metric);
            }
        })
            // This catches any errors that happen while creating the readable stream
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(null, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            //send back the metrics that correspond to the id in the url
            callback(null, metrics);
            console.log('Stream ended');
        });
    };
    //delete one metric from an ID
    MetricsHandler.prototype.deleteOneFromID = function (id, timestamp, callback) {
        var metrics = [];
        //open up a readable stream
        this.db.createReadStream()
            .on('data', function (data) {
            var tempKey = "metric:" + id + ":" + timestamp;
            //look for the right key from the metric we want to delete
            if (data.key == tempKey) {
                console.log("metric:" + id + ":" + timestamp);
                var metric = new Metric(timestamp, data.value);
                metrics.push(metric);
            }
        })
            // This catches any errors that happen while creating the readable stream
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(null, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            //send back the metrics that correspond to the id in the url
            callback(null, metrics);
            console.log('Stream ended');
        });
    };
    //delete one metric from an ID
    MetricsHandler.prototype.deleteAllFromID = function (id, callback) {
        var metrics = [];
        //open up a readable stream
        this.db.createReadStream()
            .on('data', function (data) {
            var tempID = data.key.split(':')[1];
            //compare here with the id
            if (id == tempID) {
                var timestamp = data.key.split(':')[2];
                var metric = new Metric(timestamp, data.value);
                metrics.push(metric);
            }
        })
            // This catches any errors that happen while creating the readable stream
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(null, err);
        })
            .on('close', function () {
            console.log('Stream closed');
        })
            .on('end', function () {
            //send back the metrics that correspond to the id in the url
            callback(null, metrics);
            console.log('Stream ended');
        });
    };
    //delete in the db
    MetricsHandler.prototype.delete = function (metrics, id) {
        var _this = this;
        //for each metric we recreate the key to identify the metric to delete
        metrics.forEach(function (metric) {
            var tempKey = "metric:" + id + ":" + metric.timestamp;
            _this.db.del(tempKey);
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
