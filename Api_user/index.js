const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const clientes = [{
    id: 1,  
    nome: "Guilherme Pires",
    email: "guilherme.pires@gmail.com",
    senha: "123456"
}];

app.post("/cadastro", (request, response) => {
    const { id, nome, email, senha } = request.body;

    if (!id) {
        return response.status(400).send("É obrigatório enviar o campo id!");
    } else if (!nome) {
        return response.status(400).send("É obrigatório enviar o campo nome!");
    } else if (!email) {
        return response.status(400).send("É obrigatório enviar o campo email!");
    } else if (!senha) {
        return response.status(400).send("É obrigatório enviar o campo senha!");
    }

    const existe_id = clientes.filter(item => item.id == id);

    if (existe_id.length > 0) {
        return response.status(404).send(`O código ${id} já está em uso!`);
    } else {
        clientes.push(request.body);
    }

    return response.status(200).send(request.body);
});

app.get("/consulta", (request, response) => {
    response.status(200).send(clientes);
});

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080");
});
