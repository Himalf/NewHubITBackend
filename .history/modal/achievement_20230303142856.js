var mongoose = require("mongoose");
const achievementSchema = mongoose.Schema({
    image: String,
    title: String,
    source: String,
    date: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const achievementModel = mongoose.model("achievement", achievementSchema);
module.exports = achievementModel;
