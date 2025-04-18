const Section  = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async(req,res)=>{
    try{
         
        //Fetch data 
        const {sectionName
            , courseId} = req.body;
 
        //Validate 
        console.log(sectionName
            , courseId);
        if(!sectionName
            || !courseId)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"All Feilds Required",

                }
            )

        }

        //Create

        const newSection = await Section.create({sectionName:sectionName
            ,
         
        });
        //Push It in Course

       const updatedCourse =  await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {
                new:true,
            }).populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection',
                    model: 'SubSection'
                }
            });
            // Hw How to use populate Here


            return res.status(200).json({
                success:true,
                message:" Section Created SuccessFully",
                data:updatedCourse,
                section:newSection

            })

    }
    catch(e){
console.log(e);

return res.status(500).json({
    success:false,
    message:e.message,

})
    }
}

exports.updateSection = async (req,res)=>{
    try{
       
        // INput new NAme For section
         const {courseId , sectionName,sectionId} = req.body;
        //data validation
        console.log(sectionName , " " ,sectionId);
        if(!sectionName || !sectionId)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"All Feilds Required",

                }
            )

        }
        //Update
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            sectionName:sectionName
        },{new:true});
        //Response
    //  No need To update The Course 
        const updatedCourse = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection',
                model: 'SubSection'
            }
        })

        return res.status(200).json({
            success:true,
            message:"Section Updated SuccessFully !",
            data:updatedCourse,

        })

    }
    catch(e)
    {
        console.log(e);
        return res.json({
            success:false,
            message:e.message,
            
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
      // Get sectionId and courseId from req.body
      const { sectionId, courseId } = req.body;
  
      console.log("Section id from params", sectionId);
      if (!sectionId) {
        return res.json({
          success: false,
          message: "All fields required",
        });
      }
  
      // Delete the section by ID
      await Section.findByIdAndDelete({ _id: sectionId });
  
      // Update the course to remove the section and return the updated document
      const updatedCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $pull: {
            courseContent: sectionId,
          },
        },
        { new: true } // Return the updated document
      ).populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
          model: 'SubSection',
        },
      });
  
      // Check if the course was successfully updated
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Deleted section successfully",
        data: updatedCourse,
      });
    } catch (e) {
      console.log(e);
      return res.json({
        success: false,
        message: e.message,
      });
    }
  };