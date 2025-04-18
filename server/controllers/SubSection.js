const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


exports.createSubSection = async(req,res)=>{

    try{
     
         const{sectionId, title,description} = req.body;
         console.log("Display ",sectionId , title,description);
         const video = req.files.video;
         console.log("video ",video);
         //console.log(video);
         if(!sectionId || !title  || !description || !video)
         {
            return res.json({
                success:false,
                message:"All Feilds Are Required ",

            })

         }
         require('dotenv').config();
         const uploadDetails =await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //  console.log("Video Upload Details " , uploadDetails);
         const url = uploadDetails.secure_url;

         const timeDuration = uploadDetails?.duration;

         const subSection = await SubSection.create(
            {
                title,description,videoUrl:url,
                timeDuration

            }
         )

         const updatedSection =await  Section.findByIdAndUpdate(
          sectionId,
            {
              $push: {
                subSection: subSection._id,
              },
            },
            {
              new: true,
            })
          .populate('subSection')
          

        console.log("Updated Section " ,updatedSection);

        return res.status(200).json({
            success:true,
            message:"SubSecton Create dSuccessFulyy !",
            data:updatedSection,


        });
    } 


    catch(e){
         return res.status(500).json({
            success:false,
            message:e.message,
         })
    }
} 


//update

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId,subSectionId ,title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()
   const updatedSection = await Section.findById(sectionId).populate("subSection")
    return res.json({
      success: true,
      message: "Section updated successfully",
      data:updatedSection
    })
  } 
  catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}


//delete
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }
    const updatedSection = await Section.findById(sectionId) .populate({
      path: 'courseContent', // Populating courseContent field which contains Section references
      populate: {
        path: 'subSection', // Populating subSection field within each Section
         // Specifying the model for subSection
      }
    })
    .exec();
   
    return res.json({
      success: true,
      message: "SubSection updated  successfully",
      data:updatedSection
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}



