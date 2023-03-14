var express = require("express");
var Aboutus = require("../controller/aboutusdetail");
// const path = require("path");
// const multer = require("multer");
const router = express.Router();
// var mongoose = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: aboutusroute
 *   description: aboutusroute manageing api
 */

/**
 * @swagger
 * /aboutus:
 *   get:
 *     summary: Returns all Aboutus contents
 *     tags: [Inquire]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", Aboutus.getAboutus);
router.get("/:id", Aboutus.getSingleAboutus)
router.post("/", Aboutus.PostAboutus);
router.delete("/:id", Aboutus.DeleteAboutus);
router.put('/:id', Aboutus.updateAboutus);
module.exports = router;
