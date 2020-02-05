# Desafio Certi

Desafio técnico, para Desenvolvedor de Software, do instituto Certi Sapientia.

Servidor HTTP que retorna um JSON com chave `extenso` que é a versão por extenso do número inteiro enviado no path. Números no intervalo de -99999 à 99999.

Optei por usar NodeJS para criar a aplicação

## Funcionamento

### Sem Docker

Para instalar todas as dependencias:

```
npm install
```

Para iniciar a aplicação:

```
npm start
```

### Com Docker

Preparar o ambiente docker:
```
# docker build -t node-docker .
```

Iniciar servidor docker:
```
# docker run -it -p 9000:3000 node-docker
```
Eu usei a porta 9000 porque era a porta livre que eu tinha disponiível, mas ela poder ser substituida por qualquer uma. O nome 'node-docker' também pode ser trocado se preferir.

```
# docker build -t <NOME-PROJETO> .
# docker run -it -p <PORTA-DISPONIVEL>:3000 <NOME-PROJETO>
```

## Requisições

```
$ curl http://localhost:3000/1111
{"extenso":" mil cento e onze"}
```

```
$ curl http://localhost:3000/-1111
{"extenso":"menos  mil cento e onze"}
```
