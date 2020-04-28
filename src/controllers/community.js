const express = require("express");
const communityHandler = require("../handlers/community");
const router = express.Router();

/**
 * @swagger
 * /api/community:
 *  get:
 *    description: Use to request all communities
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", communityHandler.getAllCommunities);

/**
 * @swagger
 * /api/community/:id:
 *  get:
 *    description: Use to request all communities
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/:id", communityHandler.getCommunity);

router.post("/", communityHandler.addCommunity);
router.put("/:id", communityHandler.updateCommunity);
router.delete("/:id", communityHandler.deleteCommunity);

module.exports = router;
