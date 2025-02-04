const conn = require("../src/myslq-conection");

module.exports = {
    cadastro: async (req, res) => {
        const { nome, nacionalidade } = req.body;
        if (!nome || !nacionalidade) {
            return res.status(400).send({ msg: "Nome e nacionalidade são obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`INSERT INTO AUTORES (NOME, NACIONALIDADE) VALUES (?, ?)`, [nome, nacionalidade]);
            return res.status(201).send({ msg: "AUTOR cadastrado com sucesso!", AUTORId: resultado.insertId });
        } catch (error) {
            console.error("Erro ao cadastrar AUTOR", error);
            return res.status(500).send({ msg: "Erro ao cadastrar o AUTOR" });
        }
    },
    consultar: async (req, res) => {
        try {
            const [users] = await conn.raw(`SELECT * FROM AUTORES`);
            return res.status(200).send({ users });
        } catch (error) {
            console.error("Erro ao consultar AUTOR:", error);
            return res.status(500).send({ msg: "Erro ao consultar AUTOR!" });
        }
    },
    atualizar: async (req, res) => {
        const { nome, nacionalidade, id } = req.body;

        if (!nome || !nacionalidade || !id) {
            return res.status(400).send({ msg: "Nome, nacionalidade e id são obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`UPDATE AUTORES SET NOME = ?, NACIONALIDADE = ? WHERE ID = ?`, [nome, nacionalidade, id]);

            if (resultado.affectedRows !== 0) {
                return res.status(200).send({ msg: "AUTOR atualizado com sucesso!" });
            } else {
                return res.status(404).send({ msg: "AUTOR não encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao atualizar AUTOR:", error);
            return res.status(500).send({ msg: "Erro ao atualizar o AUTOR!" });
        }
    },
    deletar: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ msg: "id é obrigatório!" });
        }
        try {
            await conn.raw(`DELETE FROM AUTORES WHERE id = ?`, [id]);
            return res.status(200).send({ msg: "AUTOR deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar AUTOR:", error);
            return res.status(500).send({ msg: "Erro ao deletar o AUTOR!" });
        }
    },
};