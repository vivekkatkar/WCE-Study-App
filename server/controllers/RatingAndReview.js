
const RatingAndReview = require('../models/RatingAndReview');
const  Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        console.log(rating,review,courseId);
        
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentEnolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//GetAvgRating
exports.getAvgRating = async(req,res)=>{
    try{
           
        //GetCourseId
        const courseId = req.body.courseId;
        //CalculateAvgRating
        const result = await RatingAndReview.aggregate([
            {
                 $match:{
                    //Convert cid from string to object Id
                 course: new mongoose.Types.ObjectId(courseId),
               
                 }



                 },
                 {
                    $group:{
                        //group in single wrap
                        _id:null,
                        averageRating : { $avg: "$rating"},

                    }
                 }
                ])

        //Return Ratig
        if(result.length >0)
        {
            return res.status(200).json({
                success:true,
                averageRating:result[0],
            })
        }
        //If No Rating Review Exists

        return res.status(200).json({
            messgae:"Average RAting is 0  , no ratings given till Now",
            success:false,
                 averageRating:0,
        });


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

//GetAllRAtingAndRevews

exports.getAllRating = async(req,res)=>{
 
    try{
        console.log("Call Recived ")
        
        const allReviews =  await RatingAndReview.find()
                             .sort({rating:"desc"})
                             .populate("course")
                             .populate("user")
                             .exec();
return res.status(200).json({
    success:true,
    messgae:"All reviews Fetched SuccessFully ! ",
    data:allReviews,
});


    }
    catch(e)
    {

    }
}


