const conn = require("../src/mysql-conetion");

module.exports = {
    cadastro: async (req, res) => {
        const { nome, telefone } = req.body;

        if (!nome || !telefone) {
            return res.status(400).send({ msg: "Nome e telefone são obrigatórios!" });
        }

        try {
            const [result] = await conn.raw(
                `INSERT INTO cliente (nome, telefone) VALUES (?, ?)`,
                [nome, telefone]
            );
            return res.status(201).send({ msg: "Cliente cadastrado com sucesso!", clienteId: result.insertId });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao cadastrar o cliente!" });
        }
    },

    consultar: async (req, res) => {
        try {
            const [clientes] = await conn.raw(`SELECT * FROM cliente`);
            return res.status(200).send({ clientes });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar clientes!" });
        }
    },

    buscaPorId: async (req, res) => {
        const { id } = req.params;

        try {
            const [cliente] = await conn.raw(`SELECT * FROM mercado.cliente WHERE id = ?`, [id]);
            if (cliente.length === 0) {
                return res.status(404).send({ msg: "Cliente não encontrado!" });
            }
            return res.status(200).send(cliente[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao consultar o cliente!" });
        }
    },

    atualizar: async (req, res) => {
        const { id } = req.params;
        const { nome, telefone } = req.body;

        if (!nome || !telefone) {
            return res.status(400).send({ msg: "Nome e telefone são obrigatórios!" });
        }

        try {
            await conn.raw(
                `UPDATE cliente SET nome = ?, telefone = ? WHERE id = ?`,
                [nome, telefone, id]
            );
            return res.status(200).send({ msg: "Cliente atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao atualizar o cliente!" });
        }
    },

    deletar: async (req, res) => {
        const { id } = req.params;

        try {
            await conn.raw(`DELETE FROM cliente WHERE id = ?`, [id]);
            return res.status(200).send({ msg: "Cliente deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ msg: "Erro ao deletar o cliente!" });
        }
    }
};
