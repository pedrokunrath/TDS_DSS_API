const express = require('express');
const bodyParser = require('body-parser');
const schoolRouter = require('./routes/school.router');

const app = express();
const port = 8080;

// Middleware para trabalhar com JSON
app.use(bodyParser.json());

// Rotas da API
app.use('/api', schoolRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
