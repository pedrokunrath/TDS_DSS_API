const routes = require("express").Router();
const produtoController = require("../controller/produto.controller");

//CRUD
routes.post("/", produtoController.cadastro);
routes.get("/", produtoController.consultar);
routes.get("/:id", produtoController.buscaPorId);
routes.put("/:id([0-9]+)", produtoController.atualizar);
routes.delete("/:id([0-9]+)", produtoController.deletar);

module.exports = routes;