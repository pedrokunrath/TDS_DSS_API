const router = require("express").Router();
const autorController = require("../controllers/autor.controller");

router.post('/cadastro', autorController.cadastro);
router.get('/consultar', autorController.consultar);
router.put('/atualizar', autorController.atualizar);
router.delete('/deletar', autorController.deletar);

module.exports = router;