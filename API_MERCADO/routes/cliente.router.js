const router = require("express").Router();
const clienteController = require("../controller/cliente.controller");
router.post('/clientes', clienteController.cadastro);
router.get('/clientes', clienteController.consultar);
router.get('/clientes/:id', clienteController.buscaPorId);
router.put('/clientes/:id', clienteController.atualizar);
router.delete('/clientes/:id', clienteController.deletar);
module.exports = router;

