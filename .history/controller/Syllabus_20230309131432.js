var mongoose = require("mongoose");
var CourseModal = require("../modal/Course");
const uuid = require("uuid");

// get request
module.exports.getSyallabus = async (req, res) => {
  var { id } = req.params;
  console.log(id, req.params);
  try {
    const CourseData = await CourseModal.findById(id);
    console.log(CourseData.syallabus);
    res
      .status(200)
      .json({ data: CourseData.syallabus, message: "course fetched" });
  } catch (err) {
    res.status(404).json({ messege: err.message, status: err.status });
  }
};

// post request
module.exports.PostSubSection = async (req, res) => {
  var { id } = req.params;
  let newId = uuid.v4();
  console.log(req.body, newId);
  const SyallabusData = {};
  SyallabusData.id = newId;
  SyallabusData.subSection = req.body.SubSection;
  try {
    const UpdateCourse = await CourseModal.findById(req.body._id);
    const CourseData = await CourseModal.find({ "syallabus.sectiont_id": id });
    CourseDatad[0].syallabus.map((val, i) => {
      // console.log(val,val.Section,id,"jj")
      if (val.sectiont_id === id) {
        console.log(val.Section);
        val.subSection.push(SyallabusData);
      }
    });
    // let values=CourseData
    console.log(UpdateCourse, CourseData);
    // await CourseModal.findByIdAndUpdate(CourseDatad_id,CourseDatad,{new:true});
    await CourseModal.findByIdAndUpdate(req.body._id, ...CourseData, {
      new: true,
    });

    console.log(CourseData);
    res.status(200).json({ message: "sub section has been added" });
  } catch (err) {
    res.status(404).json({ messege: err.message, status: err.status });
  }
};

// post request

module.exports.PostSyallabus = async (req, res, upload) => {
  let newId = uuid.v4();
  console.log(req.body, newId);
  const SyallabusData = req.body;
  SyallabusData.section_id = newId;
  SyallabusData.Section = req.body.Section;

  try {
    const UpdateCourse = await CourseModal.findById(req.body._id);
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
    console.log(SyallabusData);
    await CourseModal.findByIdAndUpdate(UpdateCourse._id, UpdateCourse, {
      new: true,
    });

    res.status(201).json({ message: "section has been addded" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update request
// module.exports.UpdateCourses=async(req,res)=>{
//     const {id:_id} = req.params;
//     if(mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'no course with that id found'});
//     const UpdateCourse=await CourseModal.findByIdAndUpdate(_id,req.body,{new:true})
//     res.status(200).json({message:'course has been updated'})

// }

// delete request
// module.exports.DeleteCourse=async(req,res)=>{
//     try{
//         console.log(req.body);
//         console.log(req.params.id)
//         // if(mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'no course with that id found'});
//         await CourseModal.deleteOne(req.param.id);
//         res.status(200).json({message:'Course has been deleted'})
//     }catch(err){
//         res.status(404).json({message:err.message});
//     }
// }
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
