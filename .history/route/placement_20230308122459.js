const express = require("express");
const Placement = require("../controller/placement");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     placementDto:
 *         type: object
 *         required:
 *           - name
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           name:
 *             type: string
 *             description: this course name
 *           post:
 *             type: string
 *             description: this is course category
 *           office:
 *             type: string
 *             descrption: this is course duration
 *           file:
 *             type: file
 *             description: this is image
 */

/**
 * @swagger
 * tags:
 *   name: placement
 *   description: placement managing api
 */

/**
 * @swagger
 * /placement:
 *  get:
 *     summary: Use to request all placements
 *     tags: [placement]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */


router.get("/", Placement.getPlacement);
router.get("/:id", Placement.getSinglePlacement);
/**
 * @swagger
 * /placement/files:
 *  post:
 *    summary: create new placement
 *    tags: [placement]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/placementDto'
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
    Placement.postPlacement
);
// router.post("/files/:id", \\\)
// delete

router.delete("/:id", Placement.DeletePlacement);
// update
router.put(
    "/files/:id",
    upload.single("file"),
    Placement.updatePlacement

);
module.exports = router;
