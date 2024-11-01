const router = require("express").Router();
const produtoController = require('../controller/produto.controller');
router.post('/produtos', produtoController.cadastro);
router.get('/produtos', produtoController.consultar);
router.get('/produtos/:id', produtoController.buscaPorId);
router.put('/produtos/:id', produtoController.atualizar);
router.delete('/produtos/:id', produtoController.deletar);
module.exports = router;