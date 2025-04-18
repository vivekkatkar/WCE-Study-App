const express = require('express');
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
// require('process').config();
exports.updateCourseProgressDetails =async(req,res)=>{
    try{
      
        const {courseId,subSectionId} = req.body;
        const userId = req.user.id;

        //check if sbSection is valid
        const subSection = await SubSection.findById(subSectionId)
     if(!subSection)
     {
        return res.status(404).json({
            success:false,
            messgae:"SubSection Not Found",
        });
     }

     let courseProgress = await CourseProgress.findOne({
        courseID:courseId,userId:userId
     });
  
       if(!courseProgress)
       {
        return res.status(404).json(
            {
                success:false,
                messgae:"course Progress Does Not Valid ",
            }
        )
       }
       // check for Recompleting video

       if(await courseProgress.completedVideos.includes(subSectionId))
       {
        return res.status(404).json({
            success:false,
            message:"Videoalready Completed"
        })
       }

      await courseProgress.completedVideos.push(subSectionId);

      await courseProgress.save();
      

    }
    catch(e)
    {
        console.log("Error Occured in course progressDetails ",e);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error Occured ",
            data:e.message,
        })
    }
}
