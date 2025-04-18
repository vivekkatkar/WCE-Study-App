const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User =require('../models/User');
const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessfulEmail');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');

// const courseEnrollmentEmail = require('../mail/tmplates/courseEnrollmentTemplates')



//capture the payment and initiate the razorpay order

// exports.capturePayment = async ( req,res)=>{
//     try{
      
//         //Get courseId and User Id 
//         // validation
//         //Valid coursedetails
//         // USer Already HAd PAid ?
//         //create Order and return response

//         const {courseId} = req.body;

//         const userId = req.user.id;

//         if(!courseId || !userId)
//         {
//             return res.json({
//                 success:false,
//                 message:"Please provide Valid Detaisl",

//             })

//         }
//         const course = await Course.findById(courseId);
//         try{
      

//       if(!course)
//       {
//         return res.json({
//             success:false,
//             message:"Course Not For Course Id",

//         })
//       }
       
//       // Converted user I from string to object Id 
//       const uid = new mongoose.Types.ObjectId(userId);

//       if(course.studentEnolled.includes(uid))
//       {
//         return res.json({
//             success:false,
//             message:"User(STUDENT) Alrady Enrolled",

//         })
//       }
//         }
//         catch(e)
//         {
//             console.log(e);
//             return res.json({
//              success:false,
//              message:e.message
//             });
//         }


//         const amount = course.price;
//         const currency = "INR";
//         const options = {
//            amount: amount*100,
//            currency,
//            recipt:Math.random(Date.now()).toString(),
//            notes:{
//              courseId:course._id,
//              userId,
//            }

//         }

//         const paymentResponse = await instance.orders.create(options);
//         try{
//              //INitiate payment using razorpay
             
//              console.log(paymentResponse);

//         }
//         catch(e)
//         {
//           console.log(e);
//           return res.json({
//             success:false,
//             message:e.message,
//           })
//         }
       
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription :course.courseDescription,
//             thumbnail:course.tumbnail,
//             currency:paymentResponse.currency,
//             orderId:paymentResponse.id,
//             amount :paymentResponse.amount,

//         })
//     }
//     catch(e)
//     {
//        console.log(e);
//        return res.json({
//         success:false,
//         message:e.message
//        })
//     }
// }



// //Authorizing Payment
// exports.verifySignature = async(req,res)=>{
//     //This req is not from frontend it is from razorpay
//     //after hitting the the api
//     const webHookSecret = "123456";
//     // /This secret from razorpay
//     const signature = req.headers["x-razorpay-signature"];
    
//     //Haing the wbHook secret on server because from razorpay the signature is also hasshed so now to match them here hasshing is required

//     const shasum =crypto.createHmac("sha256",webHookSecret);
    
//     shasum.update(JSON.stringify(req.body));

//     const digest =shasum.digest("hex");

//     if(signature === digest)
//     {
//         //Autorized the payment

//         console.log("Payment is Authorized");
//         // AT he time of capturePayment we send the notes now fetch it

//         const {courseId,userId} = req.body.payload.payment.entity.notes;
//         try{
//            //After Authoriazation do some action

//            //Action
//         // find course and enroolll student in it

//         const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
//             {
//                 $push:{
//                     studentEnolled:userId
//                 }
//             },{new:true});
//             if(!enrolledCourse)
//             {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course Noy Found",
//                 })
//             }
//             //Findd the Student and add course in it
//             const enrolledStudent = await User.findOneAndUpdate({_id:userId},
//                 {
//                     $push:{
//                         courses:courseId,
//                     }
//                 },{new:true});

//                 // Send couse enrolled

//                 const emailResponse = await mailSender(
//                     enrolledStudent.email,
//                     "Congratuation You are onboarded into new Course",
//                      "Couse mil gaya kya ?"
//                 );
//                 console.log(emailResponse);

//                 return res.status(200).json({
//                     successtrue,
//                     message:" Coursed  Sold succssfully",

//                 })

//         }
//         catch(e)
//         {
//                return res.status(500).json({
//                 success:false,
//                 message:e.message,
//                })
//         }





//     }
   
//     else{
//         //Signature not matched

//         return res.status(400).json({
//             success:false,
//             messgae:" Signature Not MAtched",
            
//         })
//     }
    
     
// }

exports.capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.id
    console.log("Capture Payment UID ",userId);
    if (courses.length === 0) {
      return res.json({ success: false, message: "Please Provide Course ID" })
    }
  
    let total_amount = 0
  
    for (const course_id of courses) {
      let course
      try {
        // Find the course by its ID
        course = await Course.findById(course_id)
  
        // If the course is not found, return an error
        if (!course) {
          return res
            .status(200)
            .json({ success: false, message: "Could not find the Course" })
        }
  
        // Check if the user is already enrolled in the course
        const uid = new mongoose.Types.ObjectId(userId)
        if (course.studentEnolled.includes(uid)) {
          return res
            .status(200)
            .json({ success: false, message: "Student is already Enrolled" })
        }
  
        // Add the price of the course to the total amount
        total_amount += course.price
      } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message })
      }
    }
  
    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    }
  
    try {
      // Initiate the payment using Razorpay
      const paymentResponse = await instance.orders.create(options)
      console.log(paymentResponse)
      res.json({
        success: true,
        data: paymentResponse,
      })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ success: false, message: "Could not initiate order." })
    }
  }

// Verify payment

exports.verifyPayment = async (req, res) => {
  console.log("Verify Payment in Backend");
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
    console.log("Verify Payment UID ",userId ,"USer  ",req.user);
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) 
    {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      const uid = new mongoose.Types.ObjectId(userId)
      await enrollStudents(courses, uid, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

const enrollStudents = async(courses,userId,res)=>{
   if(!courses || !userId)
   {
    return res.status(404).json(
        {
            success:false,
            message:"Please Provide Data for courses or userId",
        }
    )
   }
   for(const course_id of courses)
   {
       try{
        const enrolledCourse = await Course.findOneAndUpdate(
            {
                _id : course_id,
            },
            {
                $push:{
                    studentEnolled:userId,
                }
            },
            {new:true}
    
           );
           if(!enrolledCourse)
           {
            return res.status(500).json(
                {
                    success:false,
                    messgae:"course Not Found <><>",
                }
            )
           }
        //   
        
        const courseProgress = await CourseProgress.create({
          courseID:course_id,userId,completedVideos:[]
        });
        const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{
            courses:course_id,
            courseProgress:courseProgress._id,
        }},{new:true});
    
    
        // Send The MAil
       

       const emailResponse =  await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`
    
       )
       console.log("Email Sent Successfully !");
    
    
       }
       catch(e)
       {
        console.log("Error //./. ",e);
        return res.status(500).json({
            success:false,
            message:"Error While Adding the course to studenr"
        })
       }
   }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
