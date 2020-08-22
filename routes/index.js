const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.render('form', { title: 'Registration Form' });
});

router.post(
  '/',
  [
    check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
    check('email').isLength({ min: 1 }).withMessage('Please enter an email'),
  ],
  (req, res) => {
    console.log(req.body);
    res.render('form', { title: 'Registration Form' });
  }
);

module.exports = router;
