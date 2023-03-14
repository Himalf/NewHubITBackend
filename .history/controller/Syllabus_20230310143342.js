var mongoose = require("mongoose");
var CourseModal = require("../modal/Course");
const uuid = require("uuid");
// get request
module.exports.getSyallabus = async (req, res) => {
  try {
    const course = await CourseModal.findById(req.params.id);
    // console.log(course)
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course.syallabus);
    // console.log(course.syallabus)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
//section post request
module.exports.PostSyallabus = async (req, res) => {
  const { Section } = req.body;
  const newSection = {
    Section: Section,
    section_id: uuid.v4(),
  };
  try {
    const course = await CourseModal.findByIdAndUpdate(
      req.params.id,
      {
        $push: { syallabus: newSection },
      },
      { new: true }
    );
    res.json(course.syallabus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// sub section post request
module.exports.PostSubSection = async (req, res) => {

  const newSection = {
    subSection: req.body.subSection,
  };
  try {
    const course = await CourseModal.findByIdAndUpdate(
      req.params.id,
      {
        $push: { syallabus, Section: newSection },
      },
      { new: true }
    );
    res.json(course.Section);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Update Request
module.exports.UpdateCourses = (req, res) => {
  CourseModal.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
    if (error) {
      console.log(error);
      res.send(error);
      console.log("Data cannot be Updated")
    } else {
      console.log('Success');
      res.send('Success');
      console.log("Successfully updated")
    }
  });
}
// Delete request   
module.exports.DeleteCourse = (req, res) => {
  CourseModal.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    else {
      return res.status(200).send(data);
    }
  });
};
