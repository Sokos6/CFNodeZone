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
router.post('/', [check('name').isLength({
  min: 1
}).withMessage('Please enter a name'), check('email').isLength({
  min: 1
}).withMessage('Please enter an email')], function (req, res) {
  console.log(req.body);
  res.render('form', {
    title: 'Registration Form'
  });
});
module.exports = router;