const { Router } = require("express");
const router = Router();
const dashController = require("../controllers/dashController");
const {
  checkAdmin,
  checkFirstTime,
  userLoader,
} = require("../middlewares/dashMiddlewares");

router.get("/", userLoader, dashController.dashboard);

module.exports = router;
