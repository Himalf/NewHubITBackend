var mongoose = require("mongoose");
const QuickCallSchema = mongoose.Schema({
    name: String,
    phone: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const QuickCallModal = mongoose.model("quickcall", QuickCallSchema);
module.exports = QuickCallModal;
