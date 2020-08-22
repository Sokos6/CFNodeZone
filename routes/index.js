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
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      res.send('Thank You for Registering!');
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
    console.log(req.body);
    res.render('form', { title: 'Registration Form' });
  }
);

module.exports = router;
