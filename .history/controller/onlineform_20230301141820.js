const mongoose = require('mongoose');
const formModel = require('../modal/onlineform');
const yup = require('yup');

// get request 
module.exports.getOnlineForm = async (req, res) => {
    try {
        const onlineFormData = await formModel.find();
        res.status(200).json({ data: onlineFormData, message: 'onlineFormData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getForm = async (req, res) => {
    try {
        const FormData = await formModel.findById({ _id: req.params.id });
        res.status(200).json({ data: FormData, message: "onlineFormData inquire fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostOnlineForm = async (req, res, upload) => {
    const inquireData = yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup.string().required("no input for email").email("valid email is required"),
        phone: yup.string().required().min(10, "invalid phone"),
    })

    try {
        await inquireData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newInquire = new InquireModal({
            image: req?.file?.path,
            name: req.body.name,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            levelOfEducation: req.body.levelOfEducation,

            guardianName: req.body.guardianName,
            guardianNumber: req.body.guardianNumber,

            course: req.body.course,
        });
        await newInquire.save();
        res.status(201).json({ data: newInquire, message: 'inquire has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request

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
