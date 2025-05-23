const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/homeController");
const { userLoader } = require("../middlewares/dashMiddlewares");

// Rota para a página inicial
router.get("/", homeController.home);
router.get("/home", homeController.home);
router.get("/sobre", homeController.sobre);
router.get("/login", homeController.login);

module.exports = router;
