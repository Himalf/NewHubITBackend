var mongoose = require("mongoose");
const featureCourseSchema = mongoose.Schema({
    startedDate: String,
    price: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const featureCourseModal = mongoose.model("featurecourse", featureCourseSchema);
module.exports = featureCourseModal;
