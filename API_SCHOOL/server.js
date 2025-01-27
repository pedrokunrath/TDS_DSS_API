const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Escola!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta!${port}`);
});