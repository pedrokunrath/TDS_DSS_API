const routes = require("express").Router();
const transactionRouter = require("./transaction.router");
const userRouter = require("./user.router");

routes.use("/transactions", transactionRouter);
routes.use("/user", userRouter);
module.exports = routes;''