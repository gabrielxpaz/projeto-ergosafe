const { Router } = require("express");
const router = Router();
const dashController = require("../controllers/dashController");
const { checkAuth } = require("../middlewares/dashMiddlewares");
const Role = require("../models/Role");

router.get("/", checkAuth, dashController.dashboard);

// Rotas admin

router.get("/users", checkAuth, dashController.users);

router.get("/criar-usuario", checkAuth, dashController.createUserScreen);
router.post("/criar-usuario", checkAuth, dashController.createUser);
router.get("/editar-usuario/:id", checkAuth, dashController.editUserScreen);
router.post("/editar-usuario", checkAuth, dashController.editUser);

module.exports = router;
