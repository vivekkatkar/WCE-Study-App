const mailSender = require("../utils/mailSender");

exports.ContactUs = (req,res)=>{

 try{

   const{ email,
   firstName,
   lastName,
   message,
   phonenumber} = req.body;

   //Email Title Body
   mailSender (email,"Message Recived SuccessFully" , `Hello ${firstName} ${lastName} Your Message Recived SuccessFully ! Thanks For Reaching To Us`)
   mailSender("ashishbhambure999@gmail.com" , "New Contact Us Form Message " , ` Details  of User Name :   ${firstName}
    ${lastName}  \n
    Contact : ${phonenumber} \n
    Message : ${message} \n
    Email : ${email} \n
   ` );

   return res.status(200).json({
    success:true,
    message:" Contact Form  Read SuccessFully "
   }
    
     
   )


 }

 catch(e)
 {
     console.log(e);

     return res.status(500).json({
        success:false,
        message:"Error While Sending Contact Us FOrm "
     })
 }

}
