const router = require("express").Router();
const userController = require("../controller/user.controller");

router.post('/cadastro', userController.cadastro);
router.get('/consultar', userController.consultar);
router.put('/atualizar', userController.atualizar);
router.delete('/deletar', userController.deletar);

module.exports = router;