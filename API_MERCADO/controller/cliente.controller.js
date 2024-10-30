const conn = require('../src/mysql-conetion');

module.exports = {
    cadastro: (req, res) => {
        const { nome, telefone } = req.body;
        let comando = telefone ?
            `INSERT INTO CLIENTE(nome, telefone) VALUES('${nome}', '${telefone}')` :
            `INSERT INTO CLIENTE(nome, telefone) VALUES('${nome}', null)`;

        conn.query(comando, (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao cadastrar um cliente!');
            }
            res.status(200).send({ msg: 'Cliente cadastrado com sucesso!' });
        });
    },
    consultar: (req, res) => {
        conn.query('SELECT * FROM CLIENTE', (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao consultar os clientes!');
            }
            res.status(200).send(results);
        });
    },
    atualizar: (req, res) => {
        const { id, nome, telefone, status } = req.body;
        const comando = `UPDATE CLIENTE SET nome='${nome}', telefone='${telefone}', status=${status} WHERE id=${id}`;

        conn.query(comando, (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar o cliente!');
            }
            res.status(200).send({ msg: 'Cliente atualizado com sucesso!' });
        });
    },
    deletar: (req, res) => {
        const { id } = req.params;
        const comando = `DELETE FROM CLIENTE WHERE id=${id}`;

        conn.query(comando, (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao deletar o cliente!');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({ msg: 'Nenhum cliente encontrado com esse código!' });
            }
            res.status(200).send({ msg: 'Cliente deletado com sucesso!' });
        });
    },
    buscaPorId: (req, res) => {
        const { id } = req.params;
        const comando = `SELECT * FROM CLIENTE WHERE id=${id}`;

        conn.query(comando, (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao consultar o cliente!');
            }
            res.status(200).send(results);
        });
    }
};