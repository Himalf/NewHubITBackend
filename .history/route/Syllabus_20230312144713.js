var express = require("express");
var Syallabus = require("../controller/Syllabus");
const path = require("path");
/**
 * @swagger
 * components:
 *   schemas:
 *     syallabusDto:
 *         type: object
 *         required:
 *           - Section
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           Section:
 *             type: string
 *             description: this Section name
 *         example:
 *           _id: dfs43gfsdghshdsj
 *           Section: kisan mahat
 */

/**
 * @swagger
 * tags:
 *   name: Syallabus
 *   description: syallabus managing api
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
 * /syallabus/{id}:
 *  get:
 *    summary: Use to request all syallabus by id
 *    tags: [Syallabus]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: this is for id
 *    responses:
 *       '200':
 *         description: A sucessfull response
 */

const router = express.Router();
router.get("/:id", Syallabus.getSyallabus);

/**
 * @swagger
 * /course/{id}/syallabus:
 *  post:
 *    summary: create new syallabus
 *    tags: [Syallabus]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/syallabusDto'
 *    responses:
 *        '201':
 *          description: A sucessfull response
 */
// router.post("/", Syallabus.PostSyallabus);
router.post('/:id', Syallabus.PostSyallabus)
// delete
// router.delete('/:id',Syallabus.DeleteSyallabus)

/**
 * @swagger
 * components:
 *   schemas:
 *     syallabusSectionDto:
 *         type: object
 *         required:
 *           - SubSection
 *         properties:
 *           _id:
 *              type: string
 *              description: this is auto genereated id
 *           SubSection:
 *             type: string
 *             description: this sub section name
 *         example:
 *           _id: dfs43gfsdghshdsj
 *           SubSection: kisan mahat
 */

/**
 * @swagger
 * /syallabus/subsection/{id}:
 *  post:
 *    summary: Use to request all syallabus subsection by id
 *    tags: [Syallabus]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/syallabusSectionDto'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: this is for id
 *    responses:
 *       '200':
 *         description: A sucessfull response
 */
// router.post("/subsection/:id", Syallabus.PostSubSection);

router.post('/subSection/:id', async (req, res) => {
    try {
        const course_id = req.params.course_id;
        const section_id = req.params.section_id;
        const { subSection, id } = req.body;
        const subSectionObj = { subSection, id };
        const savedCourse = await postSubSection(course_id, section_id, subSectionObj);
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

async function postSubSection(course_id, section_id, subSectionObj) {
    try {
        const course = await CourseModal.findById(course_id);
        if (course) {
            const syllabus = course.syallabus;
            const sectionIndex = syllabus.findIndex((section) => section.section_id === section_id);
            if (sectionIndex !== -1) {
                // section with provided section_id exists, so add new subSection
                syllabus[sectionIndex].subSection.push(subSectionObj);
                course.syallabus = syllabus;
                const savedCourse = await course.save();
                return savedCourse;
            }
            throw new Error('Section not found');
        }
        throw new Error('Course not found');
    } catch (error) {
        console.error(error);
        throw error;
    }
}
router.put(":/id", Syallabus.UpdateCourses);
router.delete(":/id", Syallabus.DeleteCourse);
module.exports = router;
