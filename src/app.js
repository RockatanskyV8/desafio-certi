'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let unidades = ["", "um", "dois", "três", "quatro", "cinco",
             "seis", "sete", "oito", "nove", "dez", "onze",
             "doze", "treze", "quatorze", "quinze", "dezesseis",
             "dezessete", "dezoito", "dezenove"];

let dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
             "sessenta", "setenta", "oitenta", "noventa"]

let centenas = ["", "cento", "duzentos", "trezentos",
             "quatrocentos", "quinhentos", "seiscentos",
             "setecentos", "oitocentos", "novecentos"]

let mil = "mil"

let possibilidades = {
  '1' : (num) => { return unidades[num] },
  '2' : (num) => {
                  let alg = num.split("");
                  let result = "";
                  if( num < 20 ){
                    result = unidades[num]
                  } else if ( num > 20 ){
                    let num1 = alg[0];
                    let num2 = alg[1];
                    result = dezenas[num1] + ' e ' + unidades[num2];
                  }
                  return result;
                },
  '3' : (num) => {},
  '4' : (num) => {}
}

app.use('/:num', (req, res, next) => {
  let algarismos = (req.params.num).split("")
  
  res.status(200).send({
    'extenso' : possibilidades[ algarismos.length ](req.params.num)
  });
});

module.exports = app;
