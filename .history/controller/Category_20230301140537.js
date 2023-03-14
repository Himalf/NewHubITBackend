const mongoose = require("mongoose");
const CategoryModal = require("../modal/Category");
//import vvalidator and tokens
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1800s" });
}

// get request
module.exports.getCategory = async (req, res) => {
  try {
    const CategoryData = await CategoryModal.find();
    res.status(200).json({ data: CategoryData, message: "category fetched" });
  } catch (err) {
    res.status(404).json({ messege: err.message, status: err.status });
  }
};
// get single category
module.exports.getCategorys = async (req, res) => {
  try {
    const CourseData = await CategoryModal.findById({ _id: req.params.id });
    res.status(200).json({ data: CourseData, message: "course fetched" });
  } catch (err) {
    res.status(404).json({ messege: err.message, status: err.status });
  }
}
// post request
module.exports.PostCategory = async (req, res, upload) => {
  const CategoryData = req.body;

  console.log(CategoryData);
  try {
    console.log(CategoryData, req.file, "worked")
    const url = req.protocol + "://" + req.get("host");
    const newCategory = new CategoryModal({
      category_name: CategoryData.category_name,
      color: CategoryData.color,
      image: req?.file?.path

    });
    await newCategory.save();
    res
      .status(201)
      .json({ data: newCategory, message: "category has been addded" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// Delete request
module.exports.DeleteCategory = (req, res) => {
  CategoryModal.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data);
  });
};
