const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )
    `);
});


app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

   
    const db = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
    db.run(query, [nome, email, senha], function (err) {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err.message);
            return res.status(500).send('Erro no servidor.');
        }
        console.log(`Usuário cadastrado com sucesso. ID: ${this.lastID}`);

        
        res.redirect('/sucesso');
    });
});


app.get('/sucesso', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'sucesso.html'));
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
