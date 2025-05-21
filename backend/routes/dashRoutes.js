const { Router } = require("express");
const router = Router();
const dashController = require("../controllers/dashController");
const {
  checkAuth,
  checkAdmin,
  checkFirstTime,
} = require("../middlewares/dashMiddlewares");

router.get("/", checkAuth, dashController.dashboard);
router.get("/first-time", dashController.firstTimeScreen);

module.exports = router;
