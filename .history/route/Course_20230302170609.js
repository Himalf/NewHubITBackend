var express = require("express");
var Course = require("../controller/Courses");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
// var mongoose = require("mongoose");
const MyModel = require('../modal/Course')
/**
 * @swagger
 * components:
 *   schemas:
 *     courseDto:
 *         type: object
 *         required:
 *           - course_name
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           course_name:
 *             type: string
 *             description: this course name
 *           course_category:
 *             type: string
 *             description: this is course category
 *           duration:
 *             type: integer
 *             descrption: this is course duration
 *           file:
 *             type: file
 *             description: this is image
 *           description:
 *             type: string
 *             description: this is description
 *          
 *         example:
 *           _id: dfs43gfsdghshdsj
 *           course_name: kisan mahat
 *           course_category: web design
 */

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Courses managing api
 */

// /**
//  * @swagger
//  * /course:
//  *   get:
//  *     summary: Returns all courses
//  *     tags: [Course]
//  *     responses:
//  *       200:
//  *         description: this is the list of all courses
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/course'
//  */
/**
 * @swagger
 * /course:
 *  get:
 *     summary: Use to request all course
 *     tags: [Course]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */

router.get("/", Course.getCourse);
router.get("/:id", Course.getCourses);
/**
 * @swagger
 * /course/files:
 *  post:
 *    summary: create new courses
 *    tags: [Course]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/courseDto'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req, file)
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/files",
  upload.single("file"),
  Course.PostCourse
  // Course.PostCourse
);

// delete
/**
 * @swagger
 * /course/{userId}:
 *  delete:
 *      description: Delete user
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *      responses:
 *          200:
 *              description: User that was deleted
 */
router.delete("/:id", Course.DeleteCourse);
router.put(
  "/files/:id",
  upload.single("file"),
  Course.updateCourse

);

module.exports = router;
