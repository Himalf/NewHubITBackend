var express = require("express");
var FeaturedCourse = require("../controller/featuredcourse");
const router = express.Router();
// var mongoose = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: featuredcourseRoute
 *   description: featuredcourseRoute manageing api
 */

/**
 * @swagger
 * /featuredcourse:
 *   get:
 *     summary: Returns all Inquire contents
 *     tags: [Inquire]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", FeaturedCourse);
router.get("/:id", Inquire.getEnquire)
router.post("/", Inquire.PostInquire);
router.delete("/:id", Inquire.DeleteInquire);
router.put('/:id', Inquire.updateInquire);
module.exports = router;
