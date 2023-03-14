var mongoose = require("mongoose");
const placementSchema = mongoose.Schema({
    image: String,
    name: String,
    post: String,
    office: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const placementModel = mongoose.model("placement", placementSchema);
module.exports = placementModel;
