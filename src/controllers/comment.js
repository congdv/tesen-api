const express = require("express");
const commentHandler = require("../handlers/comment");
const { check } = require("express-validator");
const router = express.Router();
const { authenticationUser } = require("../utils/middleware");

router.get(
  "/:id",
  [check("id").not().isEmpty()],
  commentHandler.getAllComments
);

router.post("/:id", authenticationUser, commentHandler.addComment);

module.exports = router;
