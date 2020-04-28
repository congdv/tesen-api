const express = require("express");
const categoryHandler = require("../handlers/category");
const router = express.Router();

router.get("/", categoryHandler.getAllCategories);

module.exports = router;
