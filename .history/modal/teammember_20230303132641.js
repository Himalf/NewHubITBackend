var mongoose = require("mongoose");
const teamMemberSchema = mongoose.Schema({
    foundYear: Number,
    employee: Number,
    students: Number,
    placement: Number,
    finishedProjects: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const teamMemberModel = mongoose.model("teammember", teamMemberSchema);
module.exports = teamMemberModel;
