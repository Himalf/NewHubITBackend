var mongoose = require("mongoose");
const featureCourseSchema = mongoose.Schema({
    title: String,
    description: String,
    startedDate: String,
    price: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const featureCourseModal = mongoose.model("featurecourse", featureCourseSchema);
module.exports = featureCourseModal;
