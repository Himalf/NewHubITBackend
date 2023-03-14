var mongoose = require("mongoose");
const achievementSchema = mongoose.Schema({
    image: String,
    name: String,
    position: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const achievementModel = mongoose.model("achievement", achievementSchema);
module.exports = achievementModel;
