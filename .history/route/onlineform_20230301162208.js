var express = require("express");
var onlineForm = require("../controller/onlineform");
const path = require("path");
const multer = require("multer");
// const uuid = require("uuid/v4");
const router = express.Router();
// var mongoose = require("mongoose");
// const MyModel = require('../modal/Course')

router.get("/", onlineForm.getOnlineForm);
router.get("/:id", onlineForm.getForm);

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
    onlineForm.PostOnlineForm
    // Course.PostCourse
);

// delete

router.delete("/:id", onlineForm.DeleteForm);
router.put(
    "/files/:id",
    upload.single("file"),
    onlineForm.updateForm

);

module.exports = router;
