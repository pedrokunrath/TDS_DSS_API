const router = require("express").Router();
const transactionController = require("../controller/transaction.controller");

router.post('/transaction', transactionController.transaction);
//router.get('/consultar', transactionController.consultar);
//router.put('/atualizar', transactionController.atualizar);
//router.delete('/deletar', transactionController.deletar);

module.exports = router;