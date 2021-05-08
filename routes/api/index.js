const router = require("express").Router();
const userRoutes = require("./user-routes");

// Book routes
router.use("/user-routes", userRoutes);

module.exports = router;
