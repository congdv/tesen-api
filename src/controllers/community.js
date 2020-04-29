const express = require("express");
const communityHandler = require("../handlers/community");
const router = express.Router();

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
 *    parameters:
 *      - name: Community
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Community'
 *          type: object
 *    responses:
 *      '200':
 *        description: A successful added new community
 *    tags:
 *      - Community
 */
router.post("/", communityHandler.addCommunity);

/**
 * @swagger
 * /api/community/{id}:
 *  put:
 *    description: Update a specific community
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
router.put("/:id", communityHandler.updateCommunity);

/**
 * @swagger
 * /api/community/{id}:
 *  delete:
 *    description: Delete a specific community
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
router.delete("/:id", communityHandler.deleteCommunity);

module.exports = router;
