const express = require('express');
const routes = express.Router();
const clienteController = require('../controllers/cliente.controller')

routes.post("/cadastro", clienteController.cadastro)
routes.get("/consulta", clienteController.consultAll)
routes.get("/consulta/each/:id", clienteController.consultEach)
routes.delete("/delete/each/:id", clienteController.deleteEach)

module.exports = routes;