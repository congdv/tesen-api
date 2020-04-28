const router = require("express").Router();
const userHandler = require("../handlers/user");
const { check } = require("express-validator");
const { authenticationUser } = require("../utils/middleware");

//Post
router.post(
  "/login",
  [check("email").not().isEmpty().trim(), check("password").not().isEmpty()],
  userHandler.login
);

router.post(
  "/register",
  [
    check("email").isEmail().trim(),
    check("firstName").not().isEmpty().isLength({ min: 3, max: 255 }).trim(),
    check("lastName").not().isEmpty().isLength({ min: 3, max: 255 }).trim(),
    check("password").not().isEmpty().isLength({ min: 3 }),
  ],
  userHandler.register
);

module.exports = router;
