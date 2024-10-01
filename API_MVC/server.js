const express = require('express');
const bodyParser = require('body-parser');
const clienteController = require('./controller/cliente.controller');

const app = express();
const port = 3005;

app.use(bodyParser.json());

app.post('/cadastro', clienteController.cadastro);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});