const mongoose = require('mongoose');
const InstructorModal = require('../modal/instructor');
const yup = require('yup');

// get request 
module.exports.getInstructor = async (req, res) => {
    try {
        const InstructorData = await InstructorModal.find();
        res.status(200).json({ data: InstructorData, message: 'InstructorData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getInstructor = async (req, res) => {
    try {
        const singleInstructorData = await InstructorModal.findById({ _id: req.params.id });
        res.status(200).json({ data: singleInstructorData, message: "InstructorData  fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostInstructor = async (req, res, upload) => {
    const instructorData = yup.object().shape({
        name: yup.string().required("name is required"),
        post: yup.string().required("post is required"),
        email: yup.string().required("no input for email").email("valid email is required"),

    })
    try {
        await instructorData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newInstructor = new InstructorModal({
            image: req?.file?.path,
            name: req.body.name,
            post: req.body.name,
            email: req.body.email,
            aboutMe: req.body.aboutMe,
            skill: req.body.skill,
            experience: req.body.experience,
        });
        await newInstructor.save();
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

    CourseModal.findByIdAndUpdate(
        id,
        { $set: { name, post, email, aboutMe, skill, experience, image: imagePath } },
        { new: true },
        (error, updatedForm) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(updatedForm);
                res.send(updatedForm);
            }
        }
    );
};
// Delete request   
module.exports.DeleteForm = (req, res) => {
    InquireModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
