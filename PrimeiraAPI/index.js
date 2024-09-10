const express = require('express');
const app = express();
app.listen(8080,() => {
  console.log("o servidor esta rodando na porta 8080")   
});

app.get('/', (req, res) => {
    try {
        throw new Error("Not implemented")
        res.status(200).send("ok");
    }catch(erro) {
        res.status(500).send(erro.message);
    }
});
