var mongoose = require("mongoose");
const placementSchema = mongoose.Schema({
    image: String,
    name: String,
    post: String,
    office:
        createdAt: {
    type: Date,
    default: new Date(),
},
});
const InstructorModal = mongoose.model("instructor", InstructorSchema);
module.exports = InstructorModal;
