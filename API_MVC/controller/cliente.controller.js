const Usuarios = [];

let O = 1;

module.exports = {
    cadastro: (request, response) => {
        const { nome, email, senha, cpf } = request.body;

        if (!nome) {
            return response.status(400).send("NOME NAO INFORMADO!");
        } else if (!email) {
            return response.status(400).send("EMAIL NAO INFORMADO!");
        } else if (!senha) {
            return response.status(400).send("SENHA NAO INFORMADO!");
        } else if (!cpf) {
            return response.status(400).send("CPF NAO INFORMADO!");
        }

        const Usuario = { nome, email, senha, cpf, id: O++ };
        Usuarios.push(Usuario);

        response.status(201).send("Usuario cadastrado com sucesso!");
    }
};