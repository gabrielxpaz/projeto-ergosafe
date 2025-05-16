const { Router } = require("express");
const router = Router();
const dashController = require("../controllers/dashController");
const { checkAuth } = require("../middlewares/dashMiddlewares");

router.get("/", checkAuth, dashController.dashboard);

module.exports = router;
