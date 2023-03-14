var mongoose = require("mongoose");
const InquireSchema = mongoose.Schema({
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
const InquireModal = mongoose.model("inquire", InquireSchema);
module.exports = InquireModal;
