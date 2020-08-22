"use strict";

var express = require('express');

var mongoose = require('mongoose');

var router = express.Router();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var path = require('path');

var auth = require('http-auth');

var basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd')
});
router.get('/', function (req, res) {
  res.render('form', {
    title: 'Registration Form'
  });
});
var Registration = mongoose.model('Registration');
router.post('/', [check('name').isLength({
  min: 1
}).withMessage('Please enter a name'), check('email').isLength({
  min: 1
}).withMessage('Please enter an email')], function (req, res) {
  var errors = validationResult(req);

  if (errors.isEmpty()) {
    var registration = new Registration(req.body);
    registration.save().then(function () {
      res.send('Thank you for your registration!');
    })["catch"](function (err) {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    });
  } else {
    res.render('form', {
      title: 'Registration form',
      errors: errors.array(),
      data: req.body
    });
  }

  console.log(req.body);
  res.render('form', {
    title: 'Registration Form'
  });
});
router.get('/registrations', basic.check(function (req, res) {
  Registration.find().then(function (registrations) {
    res.render('index', {
      title: 'Listing registrations',
      registrations: registrations
    });
  })["catch"](function () {
    res.send('Sorry! Something went wrong.');
  });
}));
module.exports = router;