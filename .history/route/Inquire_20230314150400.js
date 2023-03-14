var express = require("express");
var Inquire = require("../controller/Inquires");
const path = require("path");
const multer = require("multer");
const router = express.Router();
// var mongoose = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: inquireroute
 *   description: inquireroute manageing api
 */

/**
 * @swagger
 * /inquire:
 *   get:
 *     summary: Returns all Inquire contents
 *     tags: [Inquire]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", Inquire.getInquire);
router.get("/:id", Inquire.getEnquire)
router.post("/", Inquire.PostInquire);
router.delete("/:id", Inquire.DeleteInquire);
router.put('/:id', Inquire.updateInquire);
module.exports = router;
