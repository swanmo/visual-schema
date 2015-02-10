'use strict';

var express = require('express');
// var fs = require('fs');
// var config = require('konphyg')('./config');
// var request = require('request');
var app = express();

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

app.use('/', express.static('.'));


app.listen(9000);