const { Router } = require("express");
const router = Router();
const adminController = require("../controllers/adminController");
const {
  checkAdmin,
  checkFirstTime,
  userLoader,
} = require("../middlewares/dashMiddlewares");

router.get("/users", userLoader, checkAdmin, adminController.users);
router.get(
  "/criar-usuario",
  userLoader,
  checkAdmin,
  adminController.createUserScreen
);
router.post(
  "/criar-usuario",
  userLoader,
  checkAdmin,
  adminController.createUser
);
router.get(
  "/editar-usuario/:id",
  userLoader,
  checkAdmin,
  adminController.editUserScreen
);

router.post(
  "/resetar-senha/:id",
  userLoader,
  checkAdmin,
  adminController.adminResetPassword
);
router.post(
  "/editar-usuario",
  userLoader,
  checkAdmin,
  adminController.editUser
);
router.post("/delete", userLoader, checkAdmin, adminController.deleteUser);

module.exports = router;
