const express = require("express");
const communityHandler = require("../handlers/community");
const router = express.Router();
const { check } = require("express-validator");
const { authenticationUser } = require("../utils/middleware");

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: All APIs to handle community requests
 */

/**
 * @swagger
 * definitions:
 *   Community:
 *     type: object
 *     properties:
 *       pictureCover:
 *         type: string
 *       avatar:
 *         type: string
 *       name:
 *         type: string
 *       isCloseCommunity:
 *         type: boolean
 *       city:
 *         type: string
 *       category:
 *          type: array
 *          items:
 *            type: string
 *            format: uuid
 */

/**
 * @swagger
 * /api/community:
 *  get:
 *    description: Get all communities
 *    responses:
 *      '200':
 *        description: A successful response
 *    tags:
 *      - Community
 */
router.get("/", communityHandler.getAllCommunities);

/**
 * @swagger
 * /api/community:
 *  get:
 *    description: Get a specific Community
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of community
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: A successful response
 *    tags:
 *      - Community
 */
router.get("/:id", communityHandler.getCommunity);

/**
 * @swagger
 * /api/community:
 *  post:
 *    description: Create new community
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: Community
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Community'
 *          type: object
 *    responses:
 *      '200':
 *        description: A successful added new community
 *      '401':
 *        description: Access token is missing or invalid
 *    tags:
 *      - Community
 */
router.post(
  "/",
  check("pictureCover").not().isEmpty().trim(),
  check("avatar").not().isEmpty().trim(),
  check("name").not().isEmpty().trim(),
  check("isCloseCommunity").not().isEmpty().trim(),
  check("city").not().isEmpty().trim(),
  authenticationUser,
  communityHandler.addCommunity
);

/**
 * @swagger
 * /api/community/{id}:
 *  put:
 *    description: Update a specific community
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of community
 *        required: false
 *        schema:
 *          type: string
 *          format: uuid
 *    responses:
 *      '201':
 *        description: A successful response
 *    tags:
 *      - Community
 */
router.put("/:id", authenticationUser, communityHandler.updateCommunity);

/**
 * @swagger
 * /api/community/{id}:
 *  delete:
 *    description: Delete a specific community
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of community
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '204':
 *        description: A successful response
 *    tags:
 *      - Community
 */
router.delete("/:id", authenticationUser, communityHandler.deleteCommunity);

module.exports = router;
