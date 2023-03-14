const mongoose = require('mongoose');
const teamMemberModel = require('../modal/teammember');
const yup = require('yup');

// get request 
module.exports.getteamMember = async (req, res) => {
    try {
        const teamMemberData = await teamMemberModel.find();
        res.status(200).json({ data: teamMemberData, message: 'teamMemberData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getSingleteamMember = async (req, res) => {
    try {
        const singleteamMemberData = await teamMemberModel.findById({ _id: req.params.id });
        res.status(200).json({ data: singleteamMemberData, message: "teamMemberData  fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostteamMember = async (req, res, upload) => {
    try {
        // await teamMemberData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newteamMember = new teamMemberModel({
            image: req?.file?.path,
            name: req.body.name,
            post: req.body.post,

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
