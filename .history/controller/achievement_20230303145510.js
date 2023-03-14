const mongoose = require('mongoose');
const achievementModel = require('../modal/achievement');
const yup = require('yup');

// get request 
module.exports.getachievement = async (req, res) => {
    try {
        const achievementData = await achievementModel.find();
        res.status(200).json({ data: achievementData, message: 'achievementData fetched' })
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status })
    }
}

//getsingle request 
module.exports.getSingleachievement = async (req, res) => {
    try {
        const singleachievementData = await achievementModel.findById({ _id: req.params.id });
        res.status(200).json({ data: singleachievementData, message: "singleachievementData  fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
}
// post request 
module.exports.Postsingleachievement = async (req, res, upload) => {
    try {

        const url = req.protocol + '://' + req.get('host')
        const newachievement = new achievementModel({
            image: req?.file?.path,
            title: req.body.title,
            source: req.body.source,
            date: req.body.date,
        });
        await newachievement.save();
        res.status(201).json({ data: newachievement, message: 'newachievement has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}
// Update Request
module.exports.updateachievement = (req, res) => {
    const { id } = req.params;
    const { title, source, date } = req.body;
    const imagePath = req?.file?.path;

    teamMemberModel.findByIdAndUpdate(
        id,
        { $set: { title, source, date, image: imagePath } },
        { new: true },
        (error, updatedachievement) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(updatedachievement);
                res.send(updatedachievement);
            }
        }
    );
};
// Delete request   
module.exports.DeleteAchievement = (req, res) => {
    achievementModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
