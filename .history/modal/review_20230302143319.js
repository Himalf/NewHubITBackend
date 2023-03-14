const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const reviewSchema = mongoose.Schema({
    image: String,
    name: String,
    course_name: String,
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const ReviewModel = mongoose.model("review", reviewSchema);
module.exports = ReviewModel;
