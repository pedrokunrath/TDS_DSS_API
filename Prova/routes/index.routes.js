const routes = require("express").Router();
const autorRouter = require("./autor.router");
const livroRouter = require("./livro.router");

routes.use("/autor", autorRouter);
routes.use("/livro", livroRouter);
module.exports = routes;''