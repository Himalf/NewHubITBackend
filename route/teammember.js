var express = require("express");
var TeamMember = require("../controller/teammember");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
// var mongoose = require("mongoose");
// const MyModel = require('../modal/Course')
/**
 * @swagger
 * tags:
 *   name: TeamMemberroute
 *   description: TeamMember manageing api
 */

/**
 * @swagger
 * /teammember:
 *   get:
 *     summary: Returns all form contents
 *     tags: [Teammember]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", TeamMember.getteamMember);
router.get("/:id", TeamMember.getSingleteamMember);

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
    TeamMember.PostteamMember
);
router.post("/files/:id", TeamMember.PostteamMember)
// delete

router.delete("/:id", TeamMember.DeleteTeamMember);
// update
router.put(
    "/files/:id",
    upload.single("file"),
    TeamMember.updateteamMember

);

module.exports = router;
