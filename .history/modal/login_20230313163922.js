var mongoose = require("mongoose");
const LoginSchema = mongoose.Schema({
    username: "admin",
    password: "admin",
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
const loginModel = mongoose.model("login", LoginSchema);
module.exports = loginModel;
