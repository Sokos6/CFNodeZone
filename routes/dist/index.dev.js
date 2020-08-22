"use strict";

var express = require('express');

var router = express.Router();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

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
module.exports = router;