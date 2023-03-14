const mongoose = require('mongoose');
const plaecementModel = require('../modal/placement');
const yup = require('yup');

// get request 
module.exports.getPlacement = async (req, res) => {
    try {
        const PlacementData = await plaecementModel.find();
        res.status(200).json({ data: PlacementData, message: 'PlacementData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getSinglePlacement = async (req, res) => {
    try {
        const singlePlacementData = await plaecementModel.findById({ _id: req.params.id });
        res.status(200).json({ data: singlePlacementData, message: "singlePlacementData  fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.postPlacement = async (req, res, upload) => {
    const placementData = yup.object().shape({
        name: yup.string().required("name is required"),
        post: yup.string().required("post is required"),
    })
    try {
        await placementData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newPlacement = new plaecementModel({
            image: req?.file?.path,
            name: req.body.name,
            post: req.body.name,
            office: req.body.office,
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
