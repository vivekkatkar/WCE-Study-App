import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/api";
const ForgotPassword = () =>{
    const dispatch = useDispatch();
const {loading} = useSelector((state)=>state.auth)
   const [email,setEmail] = useState();
const[emailSent,setEmailSent] = useState(false);
 const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent))
     

 }
return(
        <div className=" text-white flex justify-center items-center gap-8 w-full  h-[100vh]">
    {
        loading ? (<div>Loading...</div>)  : (
          <div className=" flex flex-col gap-6">
            {/* Show Page Resste PAssword or check Email  */}
             <h1>
                {
                    !emailSent ? "Reset Your Password" : "Check Your Email "
                }
             </h1>
             <p>
                {
                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to
                ${email}`
                }
             </p>

            <form onSubmit={handleOnSubmit} className=" w-full justify-between ">
                {
                    !emailSent &&(
                        <label>
                            <p>Email Address*</p>
                            <input required type="email" name="email" 
                            className=" bg-richblack-700 rounded-md border-b-2 border-b-richblack-50 lg:h-[30px]  px-2 "
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)

                            }
                            placeholder="Enter Your Email"
                            ></input>

                        </label>
                    )
                }
                <button  className=" bg-yellow-50 rounded-md p-2  text-black  ml-4">
                    {
                        !emailSent ? ("Reset Password") :(" Resend Email")
                    }
                </button>
            </form>
            <div>
        <Link to={"/login"}>
         <p>Back To Login </p>
        </Link>

                </div>
             </div>





        )
    }
        </div>
    )
}
export default ForgotPassword;