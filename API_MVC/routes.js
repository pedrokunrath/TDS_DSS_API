const express = require('express');
const router = express.Router();
const clienteController = require('./controller/cliente.controller');

router.post('/cadastro', clienteController.cadastro);

module.exports = router;