const router = require("express").Router();
const livroController = require("../controllers/livro.controller");

router.post('/cadastro', livroController.cadastro);
router.get('/consultar', livroController.consultar);
router.put('/atualizar', livroController.atualizar);
router.delete('/deletar',livroController.deletar);

module.exports = router;