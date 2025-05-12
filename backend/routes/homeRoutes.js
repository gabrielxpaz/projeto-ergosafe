const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/homeController");

// Rota para a página inicial
router.get("/", homeController.home);
router.get("/home", homeController.home);
router.get("/sobre", homeController.sobre);

module.exports = router;