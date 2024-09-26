const express = require('express');
const routes = express.Router();
const clienteRouter = require('./cliente.router')

routes.use("/cliente", clienteRouter)

module.exports = routes;