"use strict";

var express = require('express');

var path = require('path');

var routes = require('./routes/index');

var bodyParser = require('body-parser');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', routes);
app.use(express["static"]('public'));
module.exports = app;