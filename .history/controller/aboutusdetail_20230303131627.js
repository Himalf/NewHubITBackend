const mongoose = require('mongoose');
const aboutusDetailModel = require('../modal/aboutusdetail');
const yup = require('yup');

// get request 
module.exports.getAboutus = async (req, res) => {
    try {
        const AboutusData = await aboutusDetailModel.find();
        res.status(200).json({ data: AboutusData, message: 'AboutusData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getSingleAboutus = async (req, res) => {
    try {
        const AboutusData = await InquireModal.findById({ _id: req.params.id });
        res.status(200).json({ data: AboutusData, message: "single AboutusData fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostAboutus = async (req, res, upload) => {


    try {
        // await inquireData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newAboutus = new aboutusDetailModel({
            foundYear: req.body.foundYear,
            employee: req.body.employee,
            students: req.body.students,
            placement: req.body.placement,
            finishedProjects: req.body.finishedProjects,
        });
        await newAboutus.save();
        res.status(201).json({ data: newAboutus, message: 'inquire has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateAboutus = (req, res) => {
    aboutusDetailModel.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
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
module.exports.DeleteAboutus = (req, res) => {
    aboutusDetailModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
