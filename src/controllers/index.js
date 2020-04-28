const router = require("express").Router();
const userRoutes = require("./user");
const communityRoutes = require("./community");
const commentRoutes = require("./comment");
const categoryRoutes = require("./category");

router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/community", communityRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
