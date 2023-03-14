var express = require("express");
var Achievement = require("../controller/achievement");
const path = require("path");
const multer = require("multer");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     achievementDTO:
 *         type: object
 *         required:
 *           - title
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           title:
 *             type: string
 *             description: this is title
 *           source:
 *             type: string
 *             description: this is course category
 *           file:
 *             type: file
 *             descrption: this is image
 */

/**
 * @swagger
 * tags:
 *   name: Achievement
 *   description: Achievement managing api
 */

/**
 * @swagger
 * /achievement:
 *  get:
 *     summary: Use to request all Achievement
 *     tags: [achievement]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */

router.get("/", Achievement.getachievement);
router.get("/:id", Achievement.getSingleachievement);
/**
 * @swagger
 * /achievement/files:
 *  post:
 *    summary: create new achievements
 *    tags: [Achievement]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/achievementDTO'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */
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
