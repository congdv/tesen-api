const express = require("express");
const commentHandler = require("../handlers/comment");
const router = express.Router();
const { authenticationUser } = require("../utils/middleware");
const { check } = require("express-validator");

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: All APIs to handle community requests
 */

/**
 * @swagger
 * definitions:
 *   Comment:
 *     type: object
 *     properties:
 *       comment:
 *         type: string
 *       images:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * /api/comment/{id}:
 *  get:
 *    description: get all comments of a specific community
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of community
 *        required: false
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '200':
 *        description: A successful response
 *    tags:
 *      - Comment
 */
router.get("/:id", commentHandler.getAllComments);

/**
 * @swagger
 * /api/comment/{id}:
 *  post:
 *    description: Create new comment
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: Comment
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Comment'
 *          type: object
 *      - name: id
 *        in: path
 *        description: The id of community
 *        required: false
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '200':
 *        description: A successful added new Comment
 *    tags:
 *      - Comment
 */
router.post(
  "/:id",
  check("comment").not().isEmpty().trim(),
  authenticationUser,
  commentHandler.addComment
);

module.exports = router;
