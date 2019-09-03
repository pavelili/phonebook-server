const { Router } = require('express');
const Contact = require('../models/Contact');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, phoneNumber } = req.body;
    Contact
      .create({ name, phoneNumber })
      .then(contact => res.send(contact))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Contact
      .find()
      .then(contact => res.send(contact))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Contact
      .findById(req.params.id)
      .then(contact => res.send(contact))
      .catch(next);
  });



