const Profile = require('../models/Profile');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Course = require('../models/Course');
exports.updateProfile = async (req,res)=>{
try{
   
    //Get Data
     const{dateOfBirth="",about="",gender,contactNumber,firstName,lastName} = req.body;
    //Validation
    // Try Once Printing this and takeout id from cookie
    //Here I am able to access  useraId  from req ki body bcoz i have come here after authentication middleware

    const userId = req.user.id;
 //   const {token} = req.cookies;
    // require('dotenv').config();
    // const payload =   jwt.verify(token,process.env.JWT_SECRET);
    // // console.log("Printing Payload \n",payload);
    // // console.log("Printing Tomkem From req", req.body);
     console.log("About " ,about)
    if(!contactNumber || !dateOfBirth || !about || !gender )
    {
        return res.json({
            success:false,
            message:"All Feilds ARe Required ",
            data:{contactNumber,dateOfBirth,about,gender}


        })
    }
    //User Id
    const user = await User.findById(userId);
    let  updatedUser = await User.findByIdAndUpdate(userId,{
        firstName:firstName,
        lastName:lastName,
        // image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        
    },{new:true}).populate('additionalDetails')

    //Profile Find
    const profileId = user.additionalDetails;
    const  updatedProfile = await Profile.findByIdAndUpdate(profileId,
        {
            gender,dateOfBirth,contactNumber,about,
        },
        {new:true});
    //Profile Update
    //Return Res
    updatedUser = await User.findByIdAndUpdate(userId,{
        firstName:firstName,
        lastName:lastName,
        // image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        
    },{new:true}).populate('additionalDetails')
    
    return res.status(200).json({
        success:true,
        message:"Profile Added/ Updated Successfully",
        updatedProfile :updatedProfile,
        updatedUser:updatedUser,

    })

}
catch(e)
{
 console.log(e);
 return res.status(500).json(
    {success:false,
    message:e.message,}
 )
 
}
}

//Account Delete FXN

exports.deleteAccount = async(req,res)=>{

    try{
    
        //Get Id
           const userId = req.user.id;
           const user = await User.findById(userId);
        //Validation
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User Not Found",

            })
        }
         
        // Delete Profile First
         await Profile.findByIdAndDelete({_id:user.additionalDetails});

        //Delete User
         await User.findByIdAndDelete({_id:userId});
            //HW --> unEnroll  user from all enrolled Courses
        //return res
        return res.status(200).json({
            message:"User Deleted Successfully !",
             success:false, 
        });
        //How can we Delete profile by Sceduling 
        //chrone Job

    } 
    catch(e)
    {
       return res.status(500).json(
        {
            message:e.message,
            success:false,
        }
       )
    }
}

exports.getAllUserDetails = async (req,res)=>{
    try{
        console.log(req.user);
        const userId = req.user.id;
        
        //populate se object idf ke corresponding ka data include hpo jata hai

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        if(!userDetails)
        {
            return res.json({
                success:false,
                message:"User Not Found",
            })
        }

        return res.status(200).json({
            success:true,
            data:userDetails,
        })

    }
    catch(e)
    {
          console.log(e);
          return res.status(500).json({
            success:false,
            message:e.message,

          })
    }
}
// Get Enrolled Courses 

exports.updateProfileImage = async(req,res)=>{

    try{
        console.log("Body Of Request " ,req.body);
        console.log("Body Of files " ,req.files);
        
    //   formData.append("displayPicture", imageFile)
        const imageFile =  req.files.displayPicture ;
        const uid = req.user.id;

        const response = await uploadImageToCloudinary(imageFile,"StudyNotion");

        const updatedUser = await User.findByIdAndUpdate(uid,{image:response.secure_url},{new:true}).populate('additionalDetails');

        return res.status(200).json({
            success:true,
            message:"Image UpDated SuccessFully !",
            user:updatedUser,
        })


        
        
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Error While Updating Profile Image "
        })
    }
}
exports.DeleteProfile = async(req,res) =>{

    try{
       const uid = req.user.id;
       
       const user = await User.findById(uid);

       if(!user) {
        return res.status(500).json({
            success:false,
            message:"User Does Not Exists",
        })
       }

       await User.findByIdAndDelete(uid);

       return res.status(200).json({
        success:false,
        message:"User Deleted SuccessFully ",
    })

    }
    catch(e){

        return res.status(500).json({
            success:false,
            message:"User Could Not Be Deleted",
            data:e.message,
        })

    }
}

exports.instructorDashboard = async(req,res)=>{
  try{
      
      const courseDetails = await Course.find({instructor : req.user.id});

      const courseData = courseDetails.map((course)=>{
          const  totalStudentsEnrolled = course.studentEnolled.length;
          const  totalAmountGenrated = totalStudentsEnrolled * course?.price;

          // new object with additional feilds
          const courseDataWithStats = {
            _id:course._id,
            courseName :course.courseName,
            courseDescription : course.courseDescription,
            totalAmountGenrated,
            totalStudentsEnrolled,
            

          }
          return courseDataWithStats;
      })
      return res.status(200).json({success:true,data:courseData});

  }
  catch(e)
  {
     console.log("Error -- ",e);
     return res.status(500).json({
        success:false,
        message:e.message,

     })
  }
}