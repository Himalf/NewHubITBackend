var express = require("express");
var QuickCall = require("../controller/QuickCalls");
// const path = require("path");
// const multer = require("multer");
const router = express.Router();
// var mongoose = require("mongoose");
/**
 * @swagger
 * tags:
 *   name: quickcallroute
 *   description: quickcall manageing api
 */

/**
 * @swagger
 * /quickcall:
 *   get:
 *     summary: Returns all Inquire contents
 *     tags: [Inquire]
 *     responses:
 *        '200':
 *          description: A successful Response
 */

router.get("/", QuickCall.getQuickCall);
router.get("/:id", QuickCall.getQuick)
router.post("/", QuickCall.PostQuickCall);

router.delete("/:id", QuickCall.DeleteQuickCall);
router.put('/:id', QuickCall.updateQuickCall);
module.exports = router;