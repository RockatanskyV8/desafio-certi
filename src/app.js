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
  try{
    let algarismos = leitor(req.params.num)
    res.status(200).send(algarismos);
  }catch(e){
    res.status(500).send({ 'erro' : 'Número muito alto. O maximo de casas decimais permitidas é 5' });
  }
});

module.exports = app;
