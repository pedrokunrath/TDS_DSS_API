const conn = require("../src/mysql-conection");

module.exports = {
    cadastro: async (req, res) => {
        const { nome, telefone } = req.body;
        if (!nome || !telefone) {
            return res.status(400).send({ msg: "Nome e telefone çao obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`INSERT INTO users (nome, telefone) VALUES (?, ?)`, [nome, telefone]);
            return res.status(201).send({ msg: "Usuário cadastrado com sucesso!", userId: resultado.insertId });
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
            return res.status(500).send({ msg: "Erro ao cadastrar o usuario!" });
        }
    },
    consultar: async (req, res) => {
        try {
            const [users] = await conn.raw(`SELECT * FROM users`);
            return res.status(200).send({ users });
        } catch (error) {
            console.error("Erro ao consultar usuarios:", error);
            return res.status(500).send({ msg: "Erro ao consultar usuarios!" });
        }
    },
    atualizar: async (req, res) => {
        const { nome, telefone, id } = req.body;

        if (!nome || !telefone || !id) {
            return res.status(400).send({ msg: "Nome, telefone e id são obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`UPDATE users SET nome = ?, telefone = ? WHERE id = ?`, [nome, telefone, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(200).send({ msg: "Usario atualizado com sucesso!" });
            } else {
                return res.status(404).send({ msg: "Usuário não encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            return res.status(500).send({ msg: "Erro ao atualizar o usuário!" });
        }
    },
    deletar: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ msg: "id é obrigatório!" });
        }
        try {
            await conn.raw(`DELETE FROM users WHERE id = ?`, [id]);
            return res.status(200).send({ msg: "Usuário deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            return res.status(500).send({ msg: "Erro ao deletar o usuário!" });
        }
    },
};