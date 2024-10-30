const conn = require("../src/mysql-conetion");

// CRUD
module.exports = {
    cadastro: async (req, res) => {
        const { nome, preco } = req.body;

        if (!preco) {
            return res.status(309).send({ msg: "É obrigatorio enviar o campo preco!" });
        } else if (typeof preco !== "number") {
            return res.status(309).send({ msg: "O campo preco precisa ser do tipo numerico!" });
        }

        try {
            const data = await conn.raw(`INSERT INTO 
                PRODUTO(NOME, PRECO)
                VALUES("${nome}", ${preco})`);

            return res.status(200).send(data[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "erro ao cadastrar o produto!" });
        }
    },
    consultar: async (req, res) => {

        try {
            const data = await conn.raw("SELECT * FROM PRODUTO");
            return res.send(data[0]);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "erro ao consultar os produtos!" });
        }
    },
    atualizar: (req, res) => { },
    deletar: (req, res) => { },
    buscaPorId: async (req, res) => {
        const { id } = req.params;

        // const data = await conn.raw(`SELECT * FROM PRODUTO WHERE id = ${id}`);
        const data = await conn.select("nome", "preco")
            .from("produto")
            .where({ id });

        return res.status(200).send(data);
    }
}