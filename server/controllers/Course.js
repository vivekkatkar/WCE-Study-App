const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const RatingAndReview = require('../models/RatingAndReview')
const subSection = require('../models/SubSection');
const { default: mongoose } = require('mongoose');
const CourseProgress = require('../models/CourseProgress');
//create  Handler Fxn

exports.createCourse = async(req,res)=>{

    try{
       
//Fetch The dat from req body

// Here Pass category ki id 
const {courseName, courseDescription ,whatYouWillLearn , price , category ,courseTags} = req.body;
console.log("CourseTags -- .>>" ,courseTags);
console.log(req.files);
const thumbnail =req.files.thumbnail;

//Validation 
if( !courseDescription|| !courseName ||!whatYouWillLearn || !price || !category 
   || !thumbnail  || !courseTags
    )
{
    return res.status(500).json({
        success:false,
        message:"All Feilds Are Required For Course creation",

    });

}

// Check iF User is Instructor

//Yaha pe ham  Middleware ke baad ayenge .. so req me hmne user ko embed kr diya hai 

const userId = req.user.id;
const  instructorDetails=  await User.findById(userId);
console.log("Instructor Details --> ",instructorDetails);

//No data found
if(!instructorDetails)
{
    return res.status(404).json({
        message:"Instructor Not Found",
        success:false,
    });

}

//Check Given category is vaild or not

const categoryDetails =await Category.findById(category);

//Not Tag Details

if(!categoryDetails){
    return res.status(404).json({
        success:false,
        message:" Category is Not VAlid ",

    })
}

// Upload ThumbnailTo Cloudinary
require('dotenv').config();
const response =await  uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
// create an entry for new course 




const newCourse = await Course.create({
    courseName,courseDescription,
    instructor:instructorDetails._id,
    whatYouWillLearn,
    price,
    category:categoryDetails._id,
    tumbnail:response.secure_url,
    tags:courseTags,
    status:'Draft'

});

// Update Course List of Instructor 

await User.findByIdAndUpdate({_id:instructorDetails._id}
    ,
    {
        $push : {
            courses:newCourse._id,

        }
    },
    {
        new:true,
    }
    );
    // Update the category Scema 
    
    await Category.findByIdAndUpdate({_id:category}, {
        $push:{
            courses:newCourse._id,

        }
    },{new:true});
    
return res.status(200).json({
    success:true,
    message:" Course Created SuccessFuly ",
    data:newCourse,

});

    }
    catch(e)
    {
        console.log("Error in Course creation ",e);
        return res.status(200).json({
            success:false,
            message:e.message,

        })
    }
}


exports.editCourse = async (req, res) => {
	try {
		// Get course ID from request parameters
		const courseId = req.body;
        console.log(courseId);
		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			category,
			status,
			instructions,
		} = req.body;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}

		// Check if the course exists
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course Not Found",
			});
		}

		// Update the course details
		course.courseName = courseName;
		course.courseDescription = courseDescription;
		course.whatYouWillLearn = whatYouWillLearn;
		course.price = price;
		course.category = category;
		course.status = status || "Draft";
		course.instructions = instructions;

		// Save the updated course
		await course.save();

		// Return the updated course and a success message
		res.status(200).json({
			success: true,
			data: course,
			message: "Course Updated Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the course update
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to update course",
			error: error.message,
		});
	}
};

exports.updateCourseStatus = async(req,res)=>
{
    const {courseId ,status} = req.body;

    try{
        if(!courseId)
        {
            return res.status(404).json(
                {
                    success:false,
                    message:"Course Id Missing",

                }
            )
        }

        const updatedCourse = await Course.findByIdAndUpdate({_id:courseId},{
            status
        },{new:true});
        return res.status(200).json({
            success:true,
            message:"Satus Is Updated",
            data:updatedCourse,
        })

        
    }
    catch(e)
    {
        console.log('Error While Updating Status ' , e);
        return res.status(500).json({
            data:e.message,
            success:false,
        })
    }

}


// get all courses handler Fxn

exports.showAllCourses = async (req,res)=>{
    try{
         
        const allCourses = await Course.find() .populate('instructor', 'name email') // Populate instructor with specific fields
        .populate({
            path: 'courseContent',
            populate: {
                path: 'subSection',
                model: 'SubSection'
            }
        }) // Populate courseContent and their subSections
        .populate('ratingAndReviews') // Populate ratingAndReviews
        .populate('category') // Populate category
        .populate('studentEnolled', 'name email'); ;

        if(!allCourses)
        {
            return res.status(500).json({
                success:false,
                message:" No Courses Found",

            })
        }

        return res.status(200).json({
            success:true,
            message:" Found Courses",
            data:allCourses,
        });

    }
    catch(e){
        console.log(" Cannot Fech The Courses");
        return res.status(500).json({
            success:false,
            message:" Cannot Fetch Couress",
            data:e.message,

        })
    }
}

exports.deleteCourse = async(req,res)=>{
    const {courseId} = req.body;
    try{
         if(!courseId)
         {
            return res.status(404).json({
                success:false,
                message:"Course Id Missing",
            })
         }

         await Course.findByIdAndDelete({_id:courseId});
         return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully",
         });
    }
    catch(e)
    {
        console.log("error while Deleting the Course" ,e);
    }
}



// Change Tag To Category ... 

// Get Course  Details  By Id 
function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }
  
exports.getCourseById = async (req,res)=>{

    try {
        const { courseId } = req.body
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
              select: "-videoUrl",
            },
          })
          .exec()
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection?.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data: {
            courseDetails,
            totalDuration,
          },
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}

exports.studentEnrolledCourses = async(req,res)=>{

    try{
        console.log("Logging the USer" ,req.user);
         const userId = req.user;
         const uid = new mongoose.Types.ObjectId(userId);
         console.log("UID--- ",uid);
         const enrolledCourses = await User.findById(uid).populate({
            path: 'courses',
            populate: [
              //  {path:'courseProgress'},
                { path: 'instructor', select: 'firstName lastName email' },
                { path: 'courseContent',
                  populate: [
                      { path: 'subSection', select: 'title timeDuration description videoUrl' }
                  ]
                },
                { path: 'ratingAndReviews', select: 'rating review' },
                { path: 'category', select: 'name' }
            ]
        });
         if(!enrolledCourses)
         {
            return res.status(404).json(
                {
                    success:false,
                    message:"User Not Found "
                }
            )
         }
        

        //  course Progress 
        // let totalVideos = 0;
        // enrolledCourses.courses?.courseContent?.forEach((section)=>  totalVideos += section?.subSection.length);
        //  let courseProgress =totalVideos/enrolledCourses?.courses?.courseProgress?.length;
         return res.status(200).json(
            {
                success:true,
                message:"Enrooled Courses Fetched Successfully ",
                data:enrolledCourses,
            }
         )

    }
    catch(e)
    {
        console.log("Error in Enrolled Courses " ,e);
        return res.status(500).json(
            {
                success:false,
                message:e.messgae,
            }
        )
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
    
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
