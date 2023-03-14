const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const CourseSchema = mongoose.Schema({
  course_name: String,
  course_category: String,
  duration: Number,
  description: String,
  syallabus: [
    {
      Section: String,
      section_id: String,
      subSection: [
        {
          subSection: String,
          id: String,
        },
      ],
    },
  ],
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const CourseModal = mongoose.model("course", CourseSchema);
module.exports = CourseModal;
