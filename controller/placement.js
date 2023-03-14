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
            post: req.body.post,
            office: req.body.office,
        });
        await newPlacement.save();
        res.status(201).json({ data: newPlacement, message: 'instructorData has been addded' })
    } catch (err) {
        res.status(422).json({ message: err.message })
    }
}

// Update Request
module.exports.updatePlacement = (req, res) => {
    const { id } = req.params;
    const { name, post, office } = req.body;
    const imagePath = req?.file?.path;

    plaecementModel.findByIdAndUpdate(
        id,
        { $set: { name, post, office, image: imagePath } },
        { new: true },
        (error, updatedPlacement) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(updatedPlacement);
                res.send(updatedPlacement);
            }
        }
    );
};
// Delete request
module.exports.DeletePlacement = (req, res) => {
    plaecementModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.status(200).send(data);
        }
    });
};
