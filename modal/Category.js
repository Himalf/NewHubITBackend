var mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
  category_name: String,
  color: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const CategoryModal = mongoose.model("category", CategorySchema);
module.exports = CategoryModal;
