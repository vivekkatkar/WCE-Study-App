const User =require('../models/User');
const mailSender= require('../utils/mailSender');
const bcrypt= require('bcryptjs');
//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    //email from req
   try{
    console.log("Req ki Body -->",req.body);
    const {email}  = req.body; 
    console.log(email);
    //validation
    const user = await User.findOne({email:email});

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Your Email is Not Registerd  Yet ",
        })
    }

    //genrate Token (using Crypto)
    const token = crypto.randomUUID();
    //update user by adding time and expires time
    const updatedDetails = User.findOneAndUpdate({email:email},{token,
    resetPasswordExpires:new Date(Date.now()+5*60*1000) },{new:true});
    //craete url
    const url=`http://localhost:3000/update-password/${token}`;
    //send mail containing url
    await mailSender(email," Password Reset Link " , `Password Reset Url--> ${url}`);

    //ret response
  return res.json({
    success:true,
    message:"Reset Password Email Sent SuccesFully",
    //Give Token to FrontEnd
    token:token,
    //data:updatedDetails
  })
   }
   catch(e){

    console.log("Error In REset PAssword Token", e);
    return res.json({
        success:false,
        message:"Somenthing Went Wrong While reset Password",

    });
   }


    
     
}


 
//resetPassword
exports.resetPassword = async (req,res)=>{
    try{
     //data fetch
     const {password,confirmPassword,token}=req.body;
     //validation

     if(password !== confirmPassword)
     {
        return res.json({
            success:false,
            message:"Password Not Matching",
        })
     }
     //getUserDetails
     const userDetails =User.findOne({token:token});
     if(!userDetails){
        return res.json({success:false,
        message:"Token Is InValid"})
     }    
     //If No entry Incvalid Token
     //Token Time Check Karlo
     if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            success:false,
            message:"Token Expired"
        })
     };

     //hash password

    const hashedPassword = await bcrypt.hash(password,10);
    
    const ans = await User.findOneAndUpdate({token:token},{password:hashedPassword ,},{new:true});

   //  console.log("Comparing Password" , await bcrypt.compare(password,hashedPassword))
     //update in Db
     
     return res.json({
        success:true,
        message:"Password Updated SuccesFully",
        password:password,
     })
     }
    catch(e){
        console.log("Error in reset password ",e);
        return res.json({
            success:false,
            message:e.message,
            
        })

    }
}





