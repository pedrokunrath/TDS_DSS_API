const routes = require("express").Router();
const clienteRouter = require("./cliente.router");
const pedidoRouter = require("./pedido.router");
const produtoRouter = require("./produto.router");

routes.use("/cliente", clienteRouter);
routes.use("/pedido", pedidoRouter);
routes.use("/produto", produtoRouter);
module.exports = routes;