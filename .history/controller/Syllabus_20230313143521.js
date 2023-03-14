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
  req.body.sub_id = uuid.v4();
  try {
    const UpdateCourse = await CourseModal.findById({
      _id: id
    })
    UpdateCourse.syallabus.map((val, i) => {

      if (val.section_id === req.body.section_id) {
        console.log(val.Section, "ok")
        val.subSection.push(req.body)
        console.log(UpdateCourse, "selected");
      }
    })
    await CourseModal.findByIdAndUpdate(UpdateCourse._id, UpdateCourse, { new: true }).then(result => {
      res.status(201).json({ message: 'sub section has been addded', result })
    }).catch(err => {
      res.status(500).json({ msg: 'error' })
    })
  }

  catch (err) {
    res.status(404).json({ messege: err.message, status: err.status })
  }
}
// delete section
module.exports.DeleteSection = async (req, res) => {
  try {
    const course = await CourseModal.findById(req.params.id);
    const sectionIndex = course.syallabus.findIndex(
      (Section) => Section.section_id === req.params.section_id
    );
    if (sectionIndex === -1) {
      return res.status(404).json({ message: 'Section not found' });
    }
    course.syallabus.splice(sectionIndex, 1);
    await course.save();
    res.json({ message: 'Section has been deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// update section
module.exports.UpdateSection = async (req, res) => {
  try {
    const course = await CourseModal.findById(req.params.id);
    const sectionIndex = course.syallabus.findIndex(
      (Section) => Section.section_id === req.params.section_id
    );
    if (sectionIndex === -1) {
      return res.status(404).json({ message: 'Section not found' });
    }
    const Section = course.syallabus[sectionIndex];
    Section.Section = req.body.Section;
    await course.save();
    res.json({ message: 'Section has been updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// subsection delete
module.exports.deleteSubSection = async (req, res) => {
  const { id, section_id, sub_id } = req.params;
  console.log(section_id)
  try {
    const course = await CourseModal.findById(id);
    const Section = course.syallabus.find((s) => s.section_id === section_id);

    if (!Section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const subSection = Section.subSection.find((s) => s.sub_id === sub_id);
    console.log(sub_id)
    if (!subSection) {
      return res.status(404).json({ message: 'Sub-section not found' });
    }

    Section.subSection = Section.subSection.filter((s) => s.sub_id !== sub_id);
    await course.save();

    res.json({ message: 'Sub-section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




