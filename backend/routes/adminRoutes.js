const { Router } = require("express");
const router = Router();
const adminController = require("../controllers/adminController");
const { checkAuth, checkAdmin } = require("../middlewares/dashMiddlewares");

router.get("/users", checkAuth, checkAdmin, adminController.users);
router.get(
  "/criar-usuario",
  checkAuth,
  checkAdmin,
  adminController.createUserScreen
);
router.post(
  "/criar-usuario",
  checkAuth,
  checkAdmin,
  adminController.createUser
);
router.get(
  "/editar-usuario/:id",
  checkAuth,
  checkAdmin,
  adminController.editUserScreen
);

router.post("/editar-usuario", checkAuth, checkAdmin, adminController.editUser);
router.post("/delete", checkAuth, checkAdmin, adminController.deleteUser);

module.exports = router;
