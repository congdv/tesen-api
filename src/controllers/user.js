const router = require("express").Router();
const userHandler = require("../handlers/user");
const { check } = require("express-validator");
const { authenticationUser } = require("../utils/middleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: All APIs to handle user requests
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/user/login:
 *  post:
 *    description: Login to system
 *    parameters:
 *      - name: user
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *        required:
 *          - email
 *          - password
 *    responses:
 *      '200':
 *        description: A successful added new community
 *    tags:
 *      - User
 */
router.post(
  "/login",
  [check("email").not().isEmpty().trim(), check("password").not().isEmpty()],
  userHandler.login
);

/**
 * @swagger
 * /api/user/register:
 *  post:
 *    description: Sign up new user
 *    parameters:
 *      - name: user
 *        in: body
 *        schema:
 *          $ref: '#/definitions/User'
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *              format: password
 *    responses:
 *      '200':
 *        description: A successful added new community
 *    tags:
 *      - User
 */
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
