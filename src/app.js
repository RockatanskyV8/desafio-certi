'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
                    "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete",
                    "dezoito", "dezenove"]

let dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"]

let centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"]

let milhares = ["", "", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"]

function digits2(num){
  let alg = num.split("");
  let result = "";
  if( num < 10 ){
    result = unidades[ alg[1] ]
  } else if( num >= 10 && num < 20 ){
    result = unidades[ num ]
  } else if ( num > 20 ){
    let num1 = alg[0];
    let num2 = alg[1];
    result = dezenas[num1] + ' e ' + unidades[num2];
  }
  return result;
}

let possibilidades = {
    '1' : (num) => { return unidades[num] },
    '2' : (num) => { return digits2(num) },
    '3' : (num) => {
                      let alg = num.split("");
                      return centenas[ alg[0] ] + ' e '
                      + digits2([alg[1], alg[2]].join(''))
                    },
    '4' : (num) => {
                      let alg = num.split("");
                      return milhares[ alg[0] ] + ' mil '
                      + centenas[ alg[1] ] + ' e '
                      + digits2([alg[2], alg[3]].join(''))
                    },
    '5' : (num) => {
                      let alg = num.split("");
                      return digits2([alg[0], alg[1]].join('')) + ' mil '
                      + centenas[ alg[2] ] + ' e '
                      + digits2([alg[3], alg[4]].join(''))
                    }
}

app.use('/:num', (req, res, next) => {
  let algarismos = () => {
    let number = (req.params.num).split("-");
    if (number.length == 1) {
      return ['' , number[0]];
    } else if (number.length == 2){
      return ['menos' , number[1]];
    }
  }

  let digitos = (algarismos()[1]).split("")
  res.status(200).send({
    'extenso' : algarismos()[0] + ' ' + possibilidades[ digitos.length ](algarismos()[1])
  });
});

module.exports = app;
