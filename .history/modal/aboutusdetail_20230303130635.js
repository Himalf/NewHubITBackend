var mongoose = require("mongoose");
const aboutusDetailSchema = mongoose.Schema({
    foundYear: Number,
    employee: Number,
    students: Number,
    placement: Number,
    finishedProjects: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const aboutusDetailModel = mongoose.model("aboutus", aboutusDetailSchema);
module.exports = aboutusDetailModel;
