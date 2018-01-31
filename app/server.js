/* Created by Steve Hartzog on 10/20/13. */
"use strict";

/* requires */
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var  expressPackage = require(path.join(__dirname, '../node_modules/express/package.json'));

/* setup */
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var logFileName = path.join(__dirname, "CableManager-" + year + "." + month + "." + day + ".log");
var logFile = fs.createWriteStream(logFileName);var baseDirectory = __dirname.replace('server', '');
var index = __dirname + "/index.html";
function replaceAll(str, find, replace) {
    return str.split(find).join(replace);
}

/* Console color support */
var red, blue, cyan, white, underline, reset;
red = '\u001b[31m';
blue = '\u001b[34m';
cyan = '\u001b[36m';
white = '\u001b[37m';
underline = '\u001b[24m';
reset = '\u001b[0m';

///* Configuration */
//app.configure(function() {
//    /* logging to file #and# console */
//    //app.use(express.logger({ stream: logFile }));
//    app.use(express.logger('dev'));
//});
//
///* development only */
//app.configure('development', function() {
//    app.use(express.errorHandler({ dumpExceptions:true, showStack: true }));
//});
//
///* production only */
//app.configure('production', function() {
//    app.use(express.errorHandler());
//});

///* redirect all defined routes to index.html */
//app.get('/:var(|index.html|Login|Dashboard|Lineups|Groups|Subscribers)', function (req, res) {
//    fs.readFile(baseDirectory + 'index.html', function (err, data) {
//        if (err) {
//            console.log(red + 'Error getting index file' + reset);
//            res.send("Index file not found.");
//        } else {
//            res.contentType('html');
//            res.send(data);
//        }
//        res.end();
//    });
//});

/** Configure Express 4.0 */
var app = express();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
//app.use(cookieParser('R66u7tFAPuiMVFyplqqdqf_36vh_2be8K37PGMoUV2KSmaEJckqq_d3TW'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(morgan({stream:logLib.winstonStream}));
app.use(bodyParser.json()); // pull information from html in POST
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy'); // Enables IPs on Azure, so the Papertrailapp log shows the Client IP that the message came from
app.use('/img', express.static(path.join(__dirname, 'public/img')));
//app.use(p3p(p3p.recommended));

/** Routes */
app.get('/data/:file', function(req, res) {
    var fileName = __dirname + "/data/" + req.params.file;
    fs.readFile(fileName, function (err, data) {
        res.header('Content-Type', 'application/json');
        res.contentType('json');
        res.send(data);
    });
});
app.get('/*', function(req, res) {
    res.render('index');
});

/** Start Express */
app.listen(port, function() {
    var myUrl = 'http://' + host + ':' + port;
    console.log(red + 'NodeJS: ' + reset + process.version);
    console.log(red + 'ExpressJS: ' + reset + expressPackage.version);
    console.log(red + 'Mode: ' + reset + cyan + '%s' + reset, app.settings.env);
    console.log(' > ' + white + 'URL' + reset + ': ' + blue + underline + '%s' + reset, myUrl);
    console.log(' > ' + white + 'Root' + reset + ': ' + baseDirectory);
});

