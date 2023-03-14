const mongoose = require("mongoose");
const OnlineFormSchema = mongoose.Schema({
    image: String,
    name: String,
    address: String,
    dateOfBirth: String,
    email: String,
    phone: String,
    gender: String,
    levelOfEducation: String,
    guardianName: String,
    guardianNumber: String,
    collegeOrSchoolName: String,
    courseName: String,
    shiftTime: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const formModel = mongoose.model("onlineform", OnlineFormSchema);
module.exports = formModel;
