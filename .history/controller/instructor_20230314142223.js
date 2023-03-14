const mongoose = require('mongoose');
const InstructorModal = require('../modal/instructor');
const yup = require('yup');
const CourseModal = require("../modal/Course")

// get request 
module.exports.getInstructor = async (req, res) => {
    try {

        const InstructorData = await InstructorModal.find();
        res.status(200).json({ data: InstructorData, message: 'InstructorData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}


// module.exports.getSingleInstructor = async (req, res) => {
//     try {
//         const singleInstructorData = await InstructorModal.findById({ _id: req.params.id });
//         res.status(200).json({ data: singleInstructorData, message: "InstructorData  fetched" });
//     } catch (err) {
//         res.status(404).json({ messege: err.message, status: err.status });
//     }
// }
module.exports.getSingleInstructorFromCourse = async (req, res) => {
    // const courseId = req.params.courseId;
    // const id = req.params.id;
    console.log(id);
    console.log(courseId)
    try {
        const instructors = await InstructorModal.find({ courseId });
        console.log(instructors)
        if (instructors.length === 0) {
            return res.status(404).json({ message: "No instructors found for this course" });
        }
        res.status(200).json({ data: instructors, message: 'Instructors with courseId have been retrieved' })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
// // post request 
// module.exports.PostInstructor = async (req, res, upload) => {
//     const instructorData = yup.object().shape({
//         name: yup.string().required("name is required"),
//         post: yup.string().required("post is required"),
//         email: yup.string().required("no input for email").email("valid email is required"),

//     })
//     try {
//         await instructorData.validate(req.body);
//         const url = req.protocol + '://' + req.get('host')
//         const newInstructor = new InstructorModal({
//             image: req?.file?.path,
//             name: req.body.name,
//             post: req.body.post,
//             email: req.body.email,
//             aboutMe: req.body.aboutMe,
//             skill: req.body.skill,
//             experience: req.body.experience,
//             courseId: req.body.courseId,
//         });

//         await newInstructor.save();
//         console.log(newInstructor)
//         res.status(201).json({ data: newInstructor, message: 'instructorData has been addded' })
//     } catch (err) {
//         res.status(422).json({ message: err.message })
//     }
// }
module.exports.PostInstructor = async (req, res, upload) => {
    const instructorData = yup.object().shape({
        name: yup.string().required("name is required"),
        post: yup.string().required("post is required"),
        email: yup.string().required("no input for email").email("valid email is required"),
        // courseId: yup.string().required("courseId is required")
    })
    try {
        await instructorData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const course = await CourseModal.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        const newInstructor = new InstructorModal({
            image: req?.file?.path,
            name: req.body.name,
            post: req.body.post,
            email: req.body.email,
            aboutMe: req.body.aboutMe,
            skill: req.body.skill,
            experience: req.body.experience,
            courseId: req.body.courseId,
        });

        await newInstructor.save();
        console.log(newInstructor)
        res.status(201).json({ data: newInstructor, message: 'instructorData has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request

module.exports.updateInstructor = (req, res) => {
    const { id } = req.params;
    const { name, post, email, aboutMe, skill, experience } = req.body;
    const imagePath = req?.file?.path;

    InstructorModal.findByIdAndUpdate(
        id,
        { $set: { name, post, email, aboutMe, skill, experience, image: imagePath } },
        { new: true },
        (error, updatedInstructor) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(updatedInstructor);
                res.send(updatedInstructor);
            }
        }
    );
};
// Delete request   
module.exports.DeleteInstructor = (req, res) => {
    InstructorModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
