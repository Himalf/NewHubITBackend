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
module.exports.PostFeaturedCourse = async (req, res, upload) => {
    const featuredCourseData = yup.object().shape({
        startedAt: yup.string().required("need startrted date");
        price: yup.string().required("price is required");
    })

    try {
        await featuredCourseData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newFeaturedCourse = new featureCourseModal({
            startedAt: req.body.startedAt,
            price: req.body.price,
        });
        await newFeaturedCourse.save();
        res.status(201).json({ data: newFeaturedCourse, message: 'featured course has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateFeaturedCourse = (req, res) => {
    featureCourseModal.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
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
module.exports.DeleteFeaturedCourse = (req, res) => {
    featureCourseModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
