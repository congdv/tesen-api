const express = require("express");
const categoryHandler = require("../handlers/category");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: All APIs to handle category requests
 */

/**
 * @swagger
 * /api/category:
 *  get:
 *    description: get all categories
 *    responses:
 *      '200':
 *        description: A successful response
 *    tags:
 *      - Category
 */
router.get("/", categoryHandler.getAllCategories);

module.exports = router;
