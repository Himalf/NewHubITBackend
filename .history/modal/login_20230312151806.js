var mongoose = require("mongoose");
const LoginSchema = mongoose.Schema({
    username: "String",
    password: "String",
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const QuickCallModal = mongoose.model("quickcall", QuickCallSchema);
module.exports = QuickCallModal;
