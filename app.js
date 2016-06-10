/**
 * Created by root on 5/19/2016.
 */

"use strict";

class app {
    constructor() {
        app.loadServer();
    }

    static loadServer() {
        const HTTP = require('http'),
            PORT = 1337,
            SERVER = HTTP.createServer(function(req, res) {
                let httpHandler = function(err, str, contentType) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('An error has occurred: ' + err.message);
                    } else if (contentType.indexOf('image') >= 0) {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(str, 'binary');
                    } else {
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(str);
                    }
                };

                if (req.headers['X-Requested-load'] === 'XMLHttpRequest0') {
                    if (req.method == 'POST') {
                        this.loadData(req, res, 0);
                    } else {
                        console.log("[405] " + req.method + " to " + req.url);
                        res.writeHead(405, "Method not supported", { 'Content-Type': 'text/html' });
                        res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
                    }
                } else if (req.url.indexOf('/javascripts/') >= 0) {
                    app.render(req.url.slice(1), 'application/ecmascript', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/css/') >= 0) {
                    app.render(req.url.slice(1), 'text/css', httpHandler, 'utf-8');
                } else if (req.url.indexOf('/images/') >= 0) {
                    app.render(req.url.slice(1), 'image/jpeg', httpHandler, 'binary');
                } else {
                    app.render('public/views/index.html', 'text/html', httpHandler, 'utf-8');
                }

            }).listen(PORT, function() {
                console.log('-= Francis Server Listening at http://127.0.0.1:' + PORT + ' =-');
            });
    }

    static render(path, contentType, callback, encoding) {
        const FS = require('fs');
        FS.readFile(__dirname + '/' + path, encoding ? encoding : 'utf-8', function(err, str) { // ternary
            callback(err, str, contentType);
        });
    }

    loadData (req, res, whichAjax) {
        req.on ('data', (chunk) => {
            this.pigeonName += chunk;
        });
        req.on ('end', () => {
            this.pigeonName = this.pigeonName + ' the Pigeon';
            alert(this.pigeonName);
        });
    }
}

module.exports = app;