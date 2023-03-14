var express = require("express");
var Login = require("../controller/login");
// const path = require("path");
// const multer = require("multer");
const router = express.Router();
// var mongoose = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: quickcallroute
 *   description: quickcall manageing api
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Returns all Inquire contents
 *     tags: [Inquire]
 *     responses:
 *        '200':
 *          description: A successful Response
 */
const validateRequestBody = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
    next();
};
router.post("/login", Login.checkLogin);
router.get("/user/:userId", authenticateUser, Login.getAuth);
router.post("/user", validateRequestBody(['email', 'password']), Login.valrqst)
module.exports = router;