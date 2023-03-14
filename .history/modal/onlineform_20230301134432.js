var mongoose = require("mongoose");
const OnlineFormSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String,
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const formModel = mongoose.model("onlineform", OnlineFormSchema);
module.exports = formModel;
