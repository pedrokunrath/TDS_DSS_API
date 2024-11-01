const conn = require("../src/mysql-conetion");

module.exports = {
    cadastro: async (req, res) => {
        const { nome, preco } = req.body;

        if (!nome || preco === undefined) {
            return res.status(400).send({ msg: "Nome e preço são obrigatórios!" });
        }

        try {
            const [result] = await conn.raw(
                `INSERT INTO produto (nome, preco) VALUES (?, ?)`,
                [nome, preco]
            );
            return res.status(201).send({ msg: "Produto cadastrado com sucesso!", produtoId: result.insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao cadastrar o produto!" });
        }
    },

    consultar: async (req, res) => {
        try {
            const [produtos] = await conn.raw(`SELECT * FROM produto`);
            return res.status(200).send({ produtos });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar produtos!" });
        }
    },

    buscaPorId: async (req, res) => {
        const { id } = req.params;

        try {
            const [produto] = await conn.raw(`SELECT * FROM produto WHERE id = ?`, [id]);
            if (produto.length === 0) {
                return res.status(404).send({ msg: "Produto não encontrado!" });
            }
            return res.status(200).send(produto[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar o produto!" });
        }
    },

    atualizar: async (req, res) => {
        const { id } = req.params;
        const { nome, preco } = req.body;

        try {
            await conn.raw(
                `UPDATE produto SET nome = ?, preco = ? WHERE id = ?`,
                [nome, preco, id]
            );
            return res.status(200).send({ msg: "Produto atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao atualizar o produto!" });
        }
    },

    deletar: async (req, res) => {
        const { id } = req.params;

        try {
            await conn.raw(`DELETE FROM produto WHERE id = ?`, [id]);
            return res.status(200).send({ msg: "Produto deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao deletar o produto!" });
        }
    }
};
