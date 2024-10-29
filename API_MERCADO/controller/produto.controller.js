const conection = require('../config/db.config');

const produtoController = {
    consultar: async (req, res) => {
        try {
            const data = await conection.raw('SELECT * FROM produtos');
            return res.send(data[0]);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao consultar produtos' });
        }
    }
};

module.exports = produtoController;