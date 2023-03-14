var express = require("express");
var Placement = require("../controller/placement");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: placementroute
 *   description: placementroute manageing api
 */

/**
 * @swagger
 * /placement:
 *   get:
 *     summary: Returns all placement contents
 *     tags: [placement]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", Placement.getPlacement);
router.get("/:id", Placement.getSinglePlacement);

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
