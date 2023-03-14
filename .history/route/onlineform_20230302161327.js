var express = require("express");
var onlineForm = require("../controller/onlineform");
const path = require("path");
const multer = require("multer");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     onlineformDto:
 *         type: object
 *         required:
 *           - name
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           image:
 *             type: file
 *             description: this is image
 *           name:
 *             type: string
 *             description: this is name
 *           address:
 *             type: string
 *             description: this is course category
 *           dateOfBirth:
 *             type: string
 *             descrption: this is date of birth
 *           email:
 *             type: string
 *             description: this is email
 *           phone:
 *             type: string
 *             description: this is phone
 *           gender:
 *             type: string
 *             description: this is gender 
 *           levelOfEducation:
 *             type: string
 *             description: this is description
 *           guardianName:
 *             type: string
 *             description: this is guardian name
 *           guardianNumber:
 *             type: string
 *             description: this is guardianNumber
 *           collegeOrSchoolName:
 *             type: string 
 *             description: this is collegeOrSchoolName
 *           courseName:
 *             type: string
 *             description: this is courseName
 *           shiftTime:
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
 *   name: onlineform
 *   description: online form managing api
 */

// /**
//  * @swagger
//  * /onlineform:
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
 * /onlineform:
 *  get:
 *     summary: Use to request all course
 *     tags: [Course]
 *     responses:
 *        '200':
 *          description: A sucessfull response
 */
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
/**
 * @swagger
 * /onlineform/files:
 *  post:
 *    summary: create new forms
 *    tags: [onlineform]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/onlineformDto'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */
const upload = multer({ storage: storage });
router.post(
    "/files",
    upload.single("file"),
    onlineForm.PostOnlineForm
);

// delete

router.delete("/:id", onlineForm.DeleteForm);
// update
router.put(
    "/files/:id",
    upload.single("file"),
    onlineForm.updateForm

);

module.exports = router;
