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

router.get("/", FeaturedCourse.getFeaturedCourse);
router.get("/:id", FeaturedCourse.getSinglefeatureCourse)
router.post("/", FeaturedCourse.PostFeaturedCourse);
router.delete("/:id", FeaturedCourse.DeleteFeaturedCourse);
router.put('/:id', FeaturedCourse.updateFeaturedCourse);
module.exports = router;
