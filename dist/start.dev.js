"use strict";

require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('open', function () {
  console.log('Mongoose connection open');
}).on('error', function (err) {
  console.log("Connection error: ".concat(err.message));
});

var app = require('./app');

var server = app.listen(3000, function () {
  console.log("Express is running on port ".concat(server.address().port));
});