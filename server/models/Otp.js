//SubSection is like single video  Here 
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
 email:{
    type:String,
    required:true,
 },
 otp:{
    type:String,
    required:true,
 },
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,

 }
 

})

//function --> send mail

async function sendVerificationEmail(email,otp){
    try{
       const emailResponse = await mailSender(email,"Verification Email from StudyNotion ",otp );
       console.log("E-mail Sent SuccessFully !! " , emailResponse)
    }
    catch(e){
        console.log("Error in otp module While Sending The MAil -- > " , e)
    }

}


otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",otpSchema);