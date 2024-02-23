// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Arrays para armazenar fatos, regras, projetos e responsáveis
let facts = [];
let rules = [];
let projects = [];
let responsibles = [];

app.use(bodyParser.json());

// Rota para cadastrar um fato
app.post('/facts', (req, res) => {
    const { fact } = req.body;
    facts.push(fact);
    res.status(201).send('Fato cadastrado com sucesso!');
});

// Rota para listar fatos cadastrados
app.get('/facts', (req, res) => {
    res.json(facts);
});

// Rota para excluir um fato
app.delete('/facts/:index', (req, res) => {
    const { index } = req.params;
    facts.splice(index, 1);
    res.send('Fato excluído com sucesso!');
});

// Rotas semelhantes para regras, projetos e responsáveis

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
