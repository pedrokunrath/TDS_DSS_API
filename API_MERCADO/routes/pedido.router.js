const router = require("express").Router();
const pedidoController = require("../controller/pedido.controller");
router.post('/pedidos', pedidoController.cadastro);
router.get('/pedidos', pedidoController.consultar);
router.get('/pedidos/:id', pedidoController.buscaPorId);
router.put('/pedidos/:id', pedidoController.atualizar);
router.delete('/pedidos/:id', pedidoController.deletar);
module.exports = router;
