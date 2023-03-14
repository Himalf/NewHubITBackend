var express = require("express");
var Achievement = require("../controller/achievement");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
// var mongoose = require("mongoose");
// const MyModel = require('../modal/Course')
/**
 * @swagger
 * tags:
 *   name: achievementroute
 *   description: achievement manageing api
 */

/**
 * @swagger
 * /achievement:
 *   get:
 *     summary: Returns all form contents
 *     tags: [achievement]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", Achievement.getachievement);
router.get("/:id", Achievement.getSingleachievement);

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
    Achievement.Postachievement
);
router.post("/files/:id", Achievement.Postachievement)
// delete

router.delete("/:id", Achievement.DeleteAchievement);
// update
router.put(
    "/files/:id",
    upload.single("file"),
    Achievement.updateachievement

);

module.exports = router;
