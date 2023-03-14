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

module.exports.PostSyallabus = async (req, res, upload) => {
  let newId = uuid.v4();
  console.log(req.body, newId)
  const SyallabusData = req.body;
  SyallabusData.section_id = newId;
  SyallabusData.Section = req.body.Section;

  try {
    const UpdateCourse = await CourseModal.findById(req.body._id)
    // console.log(UpdateCourse.syallabus.push(SyallabusData),"selected");

    // const newCourse=new CourseModal({
    //     course_name:courseData.course_name,
    //     course_category:courseData.course_category,
    //     duration:courseData.duration,
    //     description:courseData.description,
    //     syallabus:[],
    //     image:courseData.image
    // });
    // await newCourse.save();
    UpdateCourse.syallabus.push(SyallabusData);
    console.log(SyallabusData)
    await CourseModal.findByIdAndUpdate(UpdateCourse._id, UpdateCourse, { new: true })

    res.status(201).json({ message: 'section has been addded' })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// module.exports.PostSyallabus = async (req, res) => {
//   const { Section } = req.body;
//   const newSection = {
//     Section: Section,
//     section_id: uuid.v4(),
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

// sub section post request

module.exports.PostSubSection = async (req, res) => {
  var { id } = req.params;
  let newId = uuid.v4();
  console.log(req.body, newId)
  const SyallabusData = {};
  SyallabusData.id = newId;
  SyallabusData.subSection = req.body.SubSection;
  try {
    const UpdateCourse = await CourseModal.findById(req.body._id)

    const CourseDatad = await CourseModal.find({ "syallabus.section_id": id });
    CourseDatad[0].syallabus.map((val, i) => {
      // console.log(val,val.Section,id,"jj")
      if (val.section_id === id) {
        console.log(val.Section)
        val.subSection.push(SyallabusData)
      }
    })
    // let values=CourseData
    console.log(UpdateCourse, CourseDatad)
    // await CourseModal.findByIdAndUpdate(CourseDatad_id,CourseDatad,{new:true});
    await CourseModal.findByIdAndUpdate(req.body._id, ...CourseDatad, { new: true })

    // console.log(CourseDatad,"finding")
    res.status(200).json({ message: 'sub section has been added' })
  } catch (err) {
    res.status(404).json({ messege: err.message, status: err.status })
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