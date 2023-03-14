var mongoose = require("mongoose");
const InstructorSchema = mongoose.Schema({
    image: String,
    name: String,
    post: String,
    email: String,
    aboutMe: String,
    skill: String,
    experience: String,
    // course: { type: mongoose.Schema.Types.ObjectId, ref: "course" },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const InstructorModal = mongoose.model("instructor", InstructorSchema);
module.exports = InstructorModal;
