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
    console.log(course.syallabus)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
//section post request
// module.exports.PostSyallabus = async (req, res) => {
//   const { Section, subSection } = req.body;
//   const newSection = {
//     Section: Section,
//     section_id: new mongoose.Types.ObjectId(),
//     // subSection: subSection.map((sub) => ({
//     //   subSection: sub,
//     //   id: new mongoose.Types.ObjectId(),
//     // })),

//   };

//   try {
//     const course = await CourseModal.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: { syallabus: newSection },
//       },
//       { new: true }
//     );
//     res.json(course.syallabus);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
module.exports.PostSyallabus = async (req, res) => {
  const { Section, subSections } = req.body;

  if (!Section || !subSections || !Array.isArray(subSections)) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const course = await CourseModal.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const newSection = {
      Section: Section,
      section_id: String(Date.now()), // Generate a unique ID for the new section
      subSection: subSections.map(sub => ({ subSection: sub, id: String(Date.now()) })),
    };

    course.syallabus.push(newSection);
    await course.save();

    res.status(201).json(newSection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
  ;
  // Update Request
  module.exports.UpdateCourses = (req, res) => {
    InquireModal.updateOne({ _id: req.params.id }, { $set: req.body }, (error) => {
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
    InquireModal.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      else {
        return res.status(200).send(data);
      }
    });
  };
