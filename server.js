'use strict';

var express = require('express');

var app = express();

app.use('/', express.static('./main'));


app.listen(9000);
