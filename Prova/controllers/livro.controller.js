const conn = require("../src/myslq-conection");

module.exports = {
    cadastro: async (req, res) => {
        const { titulo, genero } = req.body;
        if (!titulo || !genero) {
            return res.status(400).send({ msg: "TITULO E GENERO çao obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`INSERT INTO LIVROS (TITULO, GENERO) VALUES (?, ?)`, [titulo, genero]);
            return res.status(201).send({ msg: " LIVRO cadastrado com sucesso!", LIVROId: resultado.insertId });
        } catch (error) {
            console.error("Erro ao cadastrar usuário", error);
            return res.status(500).send({ msg: "Erro ao cadastrar o LIVRO!" });
        }
    },
    consultar: async (req, res) => {
        try {
            const [livros] = await conn.raw(`SELECT * FROM LIVROS`);
            return res.status(200).send({ livros });
        } catch (error) {
            console.error("Erro ao consultar LIVROS:", error);
            return res.status(500).send({ msg: "Erro ao consultar LIVRO!" });
        }
    },
    atualizar: async (req, res) => {
        const { titulo,genero, id } = req.body;

        if (!titulo || !genero || !id) {
            return res.status(400).send({ msg: " TITULO, GENERO E ID são obrigatórios!" });
        }
        try {
            const [resultado] = await conn.raw(`UPDATE LIVROS SET TITULO = ?,GENERO t = ? WHERE ID = ?`, [titulo, genero, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(200).send({ msg: "LIVRO atualizado com sucesso!" });
            } else {
                return res.status(404).send({ msg: "LIVRO não encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao atualizar LIVRO:", error);
            return res.status(500).send({ msg: "Erro ao atualizar o LIVRO!" });
        }
    },
    deletar: async (req, res) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ msg: "ID é obrigatório!" });
        }
        try {
            await conn.raw(`DELETE FROM LIVROS WHERE ID = ?`, [id]);
            return res.status(200).send({ msg: "LIVRO deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar LIVRO:", error);
            return res.status(500).send({ msg: "Erro ao deletar o LIVRO!" });
        }
    },
};