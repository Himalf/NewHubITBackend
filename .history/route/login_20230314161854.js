// var express = require("express");
// var Login = require("../controller/login");
// // const path = require("path");
// // const multer = require("multer");
// const router = express.Router();
// // var mongoose = require("mongoose");
// /**
//  * @swagger
//  * tags:
//  *   name: quickcallroute
//  *   description: quickcall manageing api
//  */

// /**
//  * @swagger
//  * /login:
//  *   get:
//  *     summary: Returns all Inquire contents
//  *     tags: [Inquire]
//  *     responses:
//  *        '200':
//  *          description: A successful Response
//  */
// const authenticateUser = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({ message: 'Authorization header missing' });
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decodedToken.userId;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
// const validateRequestBody = (requiredFields) => (req, res, next) => {
//     const missingFields = requiredFields.filter(field => !req.body[field]);
//     if (missingFields.length > 0) {
//         return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
//     }
//     next();
// };
// router.post("/", Login.checkLogin);
// router.get("/:userId", authenticateUser, Login.getAuth);
// router.post("/", validateRequestBody(['email', 'password']), Login.valrqst);
// // router.post("/add", Login.postlog);
// module.exports = router;