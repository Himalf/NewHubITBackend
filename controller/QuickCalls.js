const mongoose = require('mongoose');
const QuickCallModal = require('../modal/QuickCall');
const yup = require('yup');

// get request 
module.exports.getQuickCall = async (req, res) => {
    try {
        const QuickCallData = await QuickCallModal.find();
        res.status(200).json({ data: QuickCallData, message: 'QuickCall data fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}
// get single request
module.exports.getQuick = async (req, res) => {
    try {
        const CourseData = await QuickCallModal.findById({ _id: req.params.id });
        res.status(200).json({ data: CourseData, message: "course fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.PostQuickCall = async (req, res) => {
    const quickCallData = yup.object().shape({
        name: yup.string().required("name is required"),
        phone: yup.string().required().min(10, "invalid phone"),
    })
    try {
        await quickCallData.validate(req.body);
        const url = req.protocol + '://' + req.get('host')
        const newQuickCall = new QuickCallModal({
            name: req.body.name,
            phone: req.body.phone,
        });
        await newQuickCall.save();
        res.status(201).json({ data: newQuickCall, message: 'QuickCall data has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateQuickCall = (req, res) => {
    QuickCallModal.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
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
module.exports.DeleteQuickCall = (req, res) => {
    QuickCallModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
