var express = require("express");
var Intructor = require("../controller/instructor");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
// var mongoose = require("mongoose");
// const MyModel = require('../modal/Course')
/**
 * @swagger
 * tags:
 *   name: onlineformroute
 *   description: onlineform manageing api
 */

/**
 * @swagger
 * /instructor:
 *   get:
 *     summary: Returns all form contents
 *     tags: [onlineform]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", Intructor.getInstructor);
router.get("/:id", Intructor.getSingleInstructor);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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
    Intructor.PostInstructor
    // Course.PostCourse
);
router.post("/files/:id", Intructor.PostInstructor)
// delete

router.delete("/:id", Intructor.DeleteInstructor);
// update
router.put(
    "/files/:id",
    upload.single("file"),
    onlineForm.updateForm

);

module.exports = router;
