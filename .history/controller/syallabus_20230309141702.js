const express = require('express');
const router = express.Router();
const CourseModal = require('../modal/Course');

// GET syllabus sections for a course
router.get('/course/:id/syllabus', async (req, res) => {
    try {
        const course = await CourseModal.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course.syllabus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new syllabus section for a course
router.post('/courses/:id/syllabus', async (req, res) => {
    const { section, subsections } = req.body;
    const newSection = {
        Section: section,
        section_id: new mongoose.Types.ObjectId(),
        subSection: subsections.map((sub) => ({
            subSection: sub,
            id: new mongoose.Types.ObjectId(),
        })),
    };
    try {
        const course = await CourseModal.findByIdAndUpdate(
            req.params.id,
            {
                $push: { syllabus: newSection },
            },
            { new: true }
        );
        res.json(course.syllabus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

