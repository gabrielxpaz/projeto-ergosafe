const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/homeController");

// Rota para a página inicial
router.get("/", homeController.home);

module.exports = router;