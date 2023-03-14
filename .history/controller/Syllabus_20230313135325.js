var mongoose = require("mongoose");
var CourseModal = require("../modal/Course");
const uuid = require("uuid");
const { updateCourse } = require("./Courses");
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
// module.exports.PostSyallabus = async (req, res) => {
//   const { Section } = req.body;
//   const newSection = {
//     Section: Section,
//     section_id: uuid.v4(),
//     // subSection: Section.map((val, i) => ({
//     //   subSection: val,
//     //   id: uuid.v4(),
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
//     console.log(course.syallabus)
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
module.exports.PostSyallabus = async (req, res, upload) => {
  req.body.section_id = uuid.v4();
  console.log(req.body, req.params)
  try {
    const UpdateCourse = await CourseModal.findById(req.params.id)
    console.log(UpdateCourse)
    UpdateCourse.syallabus.push(req.body);
    console.log(UpdateCourse, "selected");
    await CourseModal.findByIdAndUpdate(UpdateCourse._id, UpdateCourse, { new: true }).then(result => {
      res.status(201).json({ message: 'section has been addded', result })
    }).catch(err => {
      res.status(500).json({ msg: 'error' })
    })
  } catch (err) {
    res.status(404).json({ message: 'oops' })
  }
}

// sub section
module.exports.PostSubSection = async (req, res) => {
  var { id } = req.params;
  console.log(req.body, uuid.v4())
  // const SyallabusData = {};
  req.body.sub_id = uuid.v4();
  // SyallabusData.subSection = req.body.SubSection;

  try {
    const UpdateCourse = await CourseModal.findById({
      _id: id
    })
    // let values =[I]
    // console.log(UpdateCourse.syallabus.find(obj => obj._id === req.body.sec_id), "dsf")
    // console.log(UpdateCourse)
    // const CourseDatad = await CourseModal.find({ "syallabus.section_id": id });
    UpdateCourse.syallabus.map((val, i) => {
      // console.log(val, val.Section, id, "jj")
      if (val.section_id === req.body.section_id) {
        console.log(val.Section, "ok")
        val.subSection.push(req.body)
        // console.log(val.subSection.push(SyallabusData))
        console.log(UpdateCourse, "selected");
      }
    })
    // let values=CourseData
    // console.log(UpdateCourse, CourseDatad)
    // await CourseModal.findByIdAndUpdate(CourseDatad_id,CourseDatad,{new:true});
    // await CourseModal.findByIdAndUpdate(req.body._id, ...CourseDatad, { new: true })
    await CourseModal.findByIdAndUpdate(UpdateCourse._id, UpdateCourse, { new: true }).then(result => {
      res.status(201).json({ message: 'sub section has been addded', result })
    }).catch(err => {
      res.status(500).json({ msg: 'error' })
    })
  }
  // console.log(CourseDatad,"finding")
  catch (err) {
    res.status(404).json({ messege: err.message, status: err.status })
  }
}
module.exports.DeleteSection = async (req, res) => {
  try {
    const course = await CourseModal.findById(req.params.courseId);
    const section = course.syallabus.find(
      (section) => section.section_id === req.params.sectionId
    );
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    course.syallabus = course.syallabus.filter(
      (section) => section.section_id !== req.params.sectionId
    );
    await course.save();
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// update section
module.exports.UpdateSection = async (req, res) => {
  try {
    const course = await CourseModal.findById(req.params.id);
    const sectionIndex = course.syallabus.findIndex(
      (section) => section.section_id === req.params.section_id
    );
    if (sectionIndex === -1) {
      return res.status(404).json({ message: 'Section not found' });
    }
    const section = course.syallabus[sectionIndex];
    section.Section = req.body.Section;
    await course.save();
    res.json({ message: 'Section has been updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};







