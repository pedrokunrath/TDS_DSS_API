const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require("../routes/index.routes");

const app = express();
app.use(bodyParser.json());
app.use(indexRoutes);

const conn = require("../src/myslq-conection");
conn.raw('SELECT 1').then(() => {
    console.log(`Banco de dados conectado com sucesso!`);
}).catch((erro) => {
    console.log(`Erro ao conectar ao banco de dados ${erro}`);
});

app.listen(8080, () => {
    console.log(`O servidor está rodando na porta 8080! 🚀(professor guizin é LGBTQIA+🏳️‍🌈)`);
});