
const mongoose = require('mongoose');
const CourseProgress = require('./CourseProgress');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,


    },
    whatYouWillLearn:{
        type:String,

    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],

    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }],

    price:{
        type:Number,
    },
    tumbnail:{
        type:String,
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },

    studentEnolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],

    instructions:{
        type:[String],
    },

    tags:{
        type:[String],
    }
    ,
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    CourseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },

 

})

module.exports=mongoose.model("Course",courseSchema);