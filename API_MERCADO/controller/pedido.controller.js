const conn = require("../src/mysql-conetion");

module.exports = {
    cadastro: async (req, res) => {
        const { id_cliente, id_produto, quantidade } = req.body;

        if (!id_cliente || !id_produto || !quantidade) {
            return res.status(400).send({ msg: "Cliente, produto e quantidade são obrigatórios!" });
        }

        try {
            console.log("Iniciando cadastro de pedido");
            console.log("Dados recebidos:", { id_cliente, id_produto, quantidade });

            const [[produto]] = await conn.raw(`SELECT preco FROM produto WHERE id = ?`, [id_produto]);
            console.log("Produto encontrado:", produto);

            if (!produto) {
                return res.status(404).send({ msg: "Produto não encontrado!" });
            }

            const total = produto.preco * quantidade;
            console.log("Total calculado:", total);

            const [result] = await conn.raw(
                `INSERT INTO pedido (id_cliente, id_produto, quantidade, total) VALUES (?, ?, ?, ?)`,
                [id_cliente, id_produto, quantidade, total]
            );
            console.log("Resultado da inserção do pedido:", result);

            return res.status(201).send({ msg: "Pedido cadastrado com sucesso!", pedidoId: result.insertId });
        } catch (error) {
            console.error("Erro ao cadastrar o pedido:", error);
            return res.status(500).send({ msg: "Erro ao cadastrar o pedido!" });
        }
    },

    consultar: async (req, res) => {
        try {
            console.log("Consultando todos os pedidos");
            const [pedidos] = await conn.raw(`SELECT * FROM pedido`);
            console.log("Pedidos encontrados:", pedidos);

            return res.status(200).send({ pedidos });
        } catch (error) {
            console.error("Erro ao consultar pedidos:", error);
            return res.status(500).send({ msg: "Erro ao consultar pedidos!" });
        }
    },

    buscaPorId: async (req, res) => {
        const { id } = req.params;

        try {
            console.log(`Consultando pedido com ID ${id}`);
            const [pedido] = await conn.raw(`SELECT * FROM pedido WHERE id = ?`, [id]);
            console.log("Pedido encontrado:", pedido);

            if (pedido.length === 0) {
                return res.status(404).send({ msg: "Pedido não encontrado!" });
            }

            return res.status(200).send(pedido[0]);
        } catch (error) {
            console.error("Erro ao consultar o pedido:", error);
            return res.status(500).send({ msg: "Erro ao consultar o pedido!" });
        }
    },

    atualizar: async (req, res) => {
        const { id } = req.params;
        const { id_cliente, id_produto, quantidade } = req.body;

        try {
            console.log(`Atualizando pedido com ID ${id}`);
            const [[produto]] = await conn.raw(`SELECT preco FROM produto WHERE id = ?`, [id_produto]);
            console.log("Produto encontrado para atualização:", produto);

            const total = produto.preco * quantidade;
            console.log("Total calculado para atualização:", total);

            await conn.raw(
                `UPDATE pedido SET id_cliente = ?, id_produto = ?, quantidade = ?, total = ? WHERE id = ?`,
                [id_cliente, id_produto, quantidade, total, id]
            );
            console.log("Pedido atualizado com sucesso");

            return res.status(200).send({ msg: "Pedido atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar o pedido:", error);
            return res.status(500).send({ msg: "Erro ao atualizar o pedido!" });
        }
    },

    deletar: async (req, res) => {
        const { id } = req.params;

        try {
            console.log(`Deletando pedido com ID ${id}`);
            await conn.raw(`DELETE FROM pedido WHERE id = ?`, [id]);
            console.log("Pedido deletado com sucesso");

            return res.status(200).send({ msg: "Pedido deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar o pedido:", error);
            return res.status(500).send({ msg: "Erro ao deletar o pedido!" });
        }
    }
};
