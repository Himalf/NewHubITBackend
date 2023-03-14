var mongoose = require("mongoose");
const InstructorSchema = mongoose.Schema({
    image: String,
    name: String,
    post: String,
    email: String,
    aboutMe: String,
    skill: String,
    experience: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const InstructorModal = mongoose.model("inquire", InstructorSchema);
module.exports = InstructorModal;
