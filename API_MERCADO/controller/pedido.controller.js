const conn = require("../src/mysql-conetion");

module.exports = {
    cadastro: async (req, res) => {
        const { id_cliente, id_produto, quantidade } = req.body;

        if (!id_cliente || !id_produto || !quantidade) {
            return res.status(400).send({ msg: "Cliente, produto e quantidade são obrigatórios!" });
        }

        try {
            const [[produto]] = await conn.raw(`SELECT preco FROM mercado.produto WHERE id = ?`, [id_produto]);
            if (!produto) {
                return res.status(404).send({ msg: "Produto não encontrado!" });
            }
            const total = produto.preco * quantidade;

            const [result] = await conn.raw(
                `INSERT INTO mercado.pedido (id_cliente, id_produto, quantidade, total) VALUES (?, ?, ?, ?)`,
                [id_cliente, id_produto, quantidade, total]
            );
            return res.status(201).send({ msg: "Pedido cadastrado com sucesso!", pedidoId: result.insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao cadastrar o pedido!" });
        }
    },

    consultar: async (req, res) => {
        try {
            const [pedidos] = await conn.raw(`SELECT * FROM pedido`);
            return res.status(200).send({ pedidos });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar pedidos!" });
        }
    },

    buscaPorId: async (req, res) => {
        const { id } = req.params;

        try {
            const [pedido] = await conn.raw(`SELECT * FROM pedido WHERE id = ?`, [id]);
            if (pedido.length === 0) {
                return res.status(404).send({ msg: "Pedido não encontrado!" });
            }
            return res.status(200).send(pedido[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar o pedido!" });
        }
    },

    atualizar: async (req, res) => {
        const { id } = req.params;
        const { id_cliente, id_produto, quantidade } = req.body;

        try {
            const [[produto]] = await conn.raw(`SELECT preco FROM produto WHERE id = ?`, [id_produto]);
            const total = produto.preco * quantidade;

            await conn.raw(
                `UPDATE pedido SET id_cliente = ?, id_produto = ?, quantidade = ?, total = ? WHERE id = ?`,
                [id_cliente, id_produto, quantidade, total, id]
            );
            return res.status(200).send({ msg: "Pedido atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao atualizar o pedido!" });
        }
    },

    deletar: async (req, res) => {
        const { id } = req.params;

        try {
            await conn.raw(`DELETE FROM mercado.pedido WHERE id = ?`, [id]);
            return res.status(200).send({ msg: "Pedido deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao deletar o pedido!" });
        }
    }
};
