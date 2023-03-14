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


module.exports.postSectionAndSubSection = async (req, res) => {
  try {
    const course_id = req.params.course_id;
    const { section_id, Section, subSection, id } = req.body;
    const sectionObj = { section_id, Section };
    const subSectionObj = { subSection, id };
    const savedCourse = await postSectionAndSubSection(course_id, sectionObj, subSectionObj);
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function postSectionAndSubSection(course_id, sectionObj, subSectionObj) {
  try {
    const course = await CourseModal.findById(course_id);
    if (course) {
      const syllabus = course.syallabus;
      const sectionIndex = syllabus.findIndex((section) => section.section_id === sectionObj.section_id);
      if (sectionIndex === -1) {
        // section with provided section_id does not exist, so add new section and subSection
        syllabus.push(sectionObj);
        const newSectionIndex = syllabus.length - 1;
        syllabus[newSectionIndex].subSection.push(subSectionObj);
      } else {
        // section with provided section_id exists, so update existing section and add new subSection
        syllabus[sectionIndex].Section = sectionObj.Section;
        syllabus[sectionIndex].subSection.push(subSectionObj);
      }
      course.syallabus = syllabus;
      const savedCourse = await course.save();
      return savedCourse;
    }
    throw new Error('Course not found');
  } catch (error) {
    console.error(error);
    throw error;
  }
}




// //section post request
// module.exports.PostSyallabus = async (req, res) => {
//   const { Section } = req.body;
//   const newSection = {
//     Section: Section,
//     section_id: uuid.v4(),
//     // subSection: Section.map((val, i) => ({
//     //   subSection: val,
//     //   // id: new mongoose.Types.ObjectId(),
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
// // sub section
// module.exports.PostSubSection = async (req, res) => {
//   var { id } = req.params;
//   let newId = uuid.v4();
//   console.log(req.body, newId)
//   const SyallabusData = {};
//   SyallabusData.id = newId;
//   SyallabusData.subSection = req.body.SubSection;
//   try {
//     const UpdateCourse = await CourseModal.findById(req.body._id)

//     const CourseDatad = await CourseModal.find({ "syallabus.sectiont_id": id });
//     CourseDatad[0].syallabus.map((val, i) => {
//       // console.log(val,val.Section,id,"jj")
//       if (val.sectiont_id === id) {
//         console.log(val.Section)
//         val.subSection.push(SyallabusData)
//       }
//     })
//     // let values=CourseData
//     console.log(UpdateCourse, CourseDatad)
//     // await CourseModal.findByIdAndUpdate(CourseDatad_id,CourseDatad,{new:true});
//     await CourseModal.findByIdAndUpdate(req.body._id, ...CourseDatad, { new: true })

//     // console.log(CourseDatad,"finding")
//     res.status(200).json({ message: 'sub section has been added' })
//   } catch (err) {
//     res.status(404).json({ messege: err.message, status: err.status })
//   }
// }



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
