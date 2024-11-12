const conn = require("../src/mysql-conection");

module.exports = {
    transaction: async (req, res) => {
        const { id_qvaifazeropix, id_qvaireceberopix, valor } = req.body;

        if (!id_qvaifazeropix || !id_qvaireceberopix || !valor) {
            return res.status(400).send({ msg: "id_qvaifazeropix, id_qvaireceberopix e valor çao obrigatórios!" });
        }
4
        try {
            const [userFazer] = await conn.raw(`SELECT nome FROM users WHERE id = ?`, [id_qvaifazeropix]);
            const [userReceber] = await conn.raw(`SELECT nome FROM users WHERE id = ?`, [id_qvaireceberopix]);

            if (userFazer.length === 0 || userReceber.length === 0) {
                return res.status(404).send({ msg: "Um ou ambos os usuários não foram encontrados!" });
            }
            await conn.raw(`INSERT INTO transaction (id_qvaifazeropix, id_qvaireceberopix, valor) VALUES (?, ?, ?)`, [id_qvaifazeropix, id_qvaireceberopix, valor]);
            return res.status(201).send({
                msg: "Transação realizada com sucesso!",
                quem_fez: userFazer[0].nome,
                quem_recebeu: userReceber[0].nome,
                valor: valor
            });
        } catch (error) {
            console.error("Erro ao realizar transação:", error);
            return res.status(500).send({ msg: "Erro ao realizar a transação!" });
        }
    },

};