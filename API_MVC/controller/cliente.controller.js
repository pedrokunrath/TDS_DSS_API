
const Usuarios = [];

let O = 1;

module.exports = ({
    cadastro: (request, response) => {
        const {
            nome, email, senha, cpf
        } = request.body

        const Usuario = {
            nome, email, senha, cpf, id: O
        }

        if (!nome) {
            response.status(400).send("NOME NAO INFORMADO!")
        } else if (!email) {
            response.status(400).send("EMAIL NAO INFORMADO!")
        } else if (!senha) {
            response.status(400).send("SENHA NAO INFORMADO!")
        } else if (!cpf) {
            response.status(400).send("CPF NAO INFORMADO!")
        } else {
            const EmailCompara = Usuarios.filter((e) => email == e.email)
            const CpfCompara = Usuarios.filter((c) => cpf == c.cpf)

            if (EmailCompara.length == 0 && CpfCompara.length == 0) {
                Usuario.id = O++
                Usuarios.push(Usuario)
            } else {
                response.send("Email ou cpf já em uso!")
            }
        }

        response.status(200).send("Cadastrado com sucesso")
    },
    consultAll: (request, response) => {
        response.status(200).send(Usuarios)
    },
    consultEach: (request, response) => {
        const GiveIdCon = Usuarios.find(Usuario => Usuario.id == request.params.id)
        if (GiveIdCon) {
            response.status(200).send(GiveIdCon)
        } else {
            response.status(200).send("Usuario inexistente!")
        }
    },
    deleteEach: (request, response) => {
        const GiveId = Usuarios.findIndex(Usuario => Usuario.id == request.params.id)
        Usuarios.splice(GiveId, 1)

        response.status(200).send("Usuario deletado")
    }
})