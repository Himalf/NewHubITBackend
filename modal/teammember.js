var mongoose = require("mongoose");
const teamMemberSchema = mongoose.Schema({
  image: String,
  name: String,
  position: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const teamMemberModel = mongoose.model("teammember", teamMemberSchema);
module.exports = teamMemberModel;
