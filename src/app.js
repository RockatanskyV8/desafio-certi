'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const leitor = require('./leitor')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/:num', (req, res, next) => {
  let algarismos = leitor(req.params.num)
  console.log(algarismos)
  res.status(200).send(algarismos);
});

module.exports = app;
