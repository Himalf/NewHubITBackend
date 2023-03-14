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
    const formData = yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup.string().required("no input for email").email("valid email is required"),
        phone: yup.string().required().min(10, "invalid phone"),
    })

    try {
        await formData.validate(req.body);
        // const url = req.protocol + '://' + req.get('host')
        const newForm = new formModel({
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
            collegeOrSchoolName: req.body.collegeOrSchoolName,
            courseName: req.body.courseName,
            shiftTime: req.body.shiftTime,
        });
        await newForm.save();
        res.status(201).json({ data: newForm, message: 'inquire has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateForm = (req, res) => {
    const { id } = req.params;
    const { name, address, dateOfBirth, email, phone, gender, levelOfEducation, guardianName, guardianNumber, collegeOrSchoolName, courseName, shiftTime } = req.body;
    const imagePath = req?.file?.path;

    formModel.findByIdAndUpdate(
        id,
        { $set: { name, address, dateOfBirth, email, phone, gender, levelOfEducation, guardianName, guardianNumber, collegeOrSchoolName, courseName, shiftTime, image: imagePath } },
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
    formModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
