var mongoose = require("mongoose");
var ReviewModel = require("../modal/review");
// const itemData = require("../route/Course");
// get request
module.exports.getReview = async (req, res) => {
    try {
        const reviewData = await ReviewModel.find();
        res.status(200).json({ data: reviewData, message: "reviewData fetched" });
    } catch (err) {
        res.status(404).json({ messege: err.message, status: err.status });
    }
};
// // get single review
// module.exports.getsingle = async (req, res) => {
//     try {
//         const CourseData = await CourseModal.findById({ _id: req.params.id });
//         res.status(200).json({ data: CourseData, message: "course fetched" });
//     } catch (err) {
//         res.status(404).json({ messege: err.message, status: err.status });
//     }
// }
// post request
module.exports.PostReview = async (req, res, upload) => {
    const reviewData = req.body;

    try {
        console.log(reviewData, req.file, "worked");
        // const file = `${process.env.APP_HOSTING_ADDRESS + req.file.filename}`;
        const url = req.protocol + "://" + req.get("host");
        const newReview = new ReviewModel({
            image: req?.file?.path,
            name: reviewData.name,
            course_name: reviewData.course_name,
            description: reviewData.description,

        });

        await newReview.save();
        res
            .status(201)
            .json({ data: newReview, message: "course has been addded" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


// // update request
// module.exports.updateCourse = (req, res) => {
//   const { id } = req.params;
//   const { course_name, course_category, duration, description } = req.body;
//   const imagePath = req?.file?.path;

//   CourseModal.findByIdAndUpdate(
//     id,
//     { $set: { course_name, course_category, duration, description, image: imagePath } },
//     { new: true },
//     (error, updatedCourse) => {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(updatedCourse);
//         res.send(updatedCourse);
//       }
//     }
//   );
// };
// Delete request
module.exports.DeleteReview = (req, res) => {
    CourseModal.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
};
