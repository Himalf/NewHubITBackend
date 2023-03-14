const mongoose = require("mongoose");
const OnlineFormSchema = mongoose.Schema({
    image: String,
    full_name: String,
    address: String,
    dob: String,
    email: String,
    phone_number: String,
    gender: String,
    level_of_education: String,
    guardians_name: String,
    guardians_phone_number: String,
    school_or_clg_name: String,
    course_names: String,
    shifts: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const formModel = mongoose.model("onlineform", OnlineFormSchema);
module.exports = formModel;
