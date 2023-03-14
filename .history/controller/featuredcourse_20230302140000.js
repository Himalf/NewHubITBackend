const mongoose = require('mongoose');
const featureCourseModal = require('../modal/featuredcourse');
const yup = require('yup');

// get request 
module.exports.getFeaturedCourse = async (req, res) => {
    try {
        const featureCourseData = await featureCourseModal.find();
        res.status(200).json({ data: featureCourseData, message: 'featureCourseData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getSinglefeatureCourse = async (req, res) => {
    try {
        const featureCourseData = await featureCourseModal.findById({ _id: req.params.id });
        res.status(200).json({ data: featureCourseData, message: "featureCourseData  fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostInquire = async (req, res, upload) => {
    const inquireData = yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup.string().required("no input for email").email("valid email is required"),
        phone: yup.string().required().min(10, "invalid phone"),
    })

    try {
        await inquireData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newInquire = new InquireModal({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course,
            description: req.body.description,
        });
        await newInquire.save();
        res.status(201).json({ data: newInquire, message: 'inquire has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateInquire = (req, res) => {
    InquireModal.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
        if (error) {
            console.log(error);
            res.send(error);
            console.log("Data cannot be Updated")
        } else {
            console.log('Success');
            res.send('Success');
            console.log("Successfully updated")
        }
    });
}
// Delete request   
module.exports.DeleteInquire = (req, res) => {
    InquireModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
