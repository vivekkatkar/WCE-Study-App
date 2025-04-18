import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp,signUp } from "../services/api";
const VerifyEmail = ()=>{
  const dispatch = useDispatch();
    
   const {loading,signUpData} = useSelector((state)=>state.auth);

   console.log("In Sigup Page The FormData is []:: " , signUpData);

  //  console.log(" signUp Dta from Redux" , signUpData)
  
   const navigate = useNavigate();

   const [otp,setOtp] = useState('');
  // useEffect(()=>{if(!signUpData) navigate("/signup")},[])


   
   async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const {
        
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
      } = signUpData;
      
      console.log("Fetching Account Type From SetSignup --> " , accountType);
      const contactNumber = -1;
  
      // Call the signUp action, which should return a promise
      // const accountType="Student";  //Please Correct This One

      dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, contactNumber, navigate));
  
      // You can do something after the signUp action is completed, if needed
      console.log("Sign up completed!");
  
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  }
  
 //const dispatch = useDispatch;
   return(
        <div className=" w-full  h-[90vh]   text-white flex flex-col justify-center items-center ">
             {
                 loading ? (<div> Loading ... </div>) : (
              <div>
               <div  className=" py-4 "> Verify email </div>
               <p className=" py-2 ">
               A verification code has been sent to you. Enter the code below
               </p>

               <form onSubmit={handleOnSubmit} className="py-2 ">
                
               <OtpInput
      value={otp}
      onChange={setOtp}
      inputStyle={{
        width: '3rem',
        height: '3rem',
        margin: '0 0.5rem',
        fontSize: '1rem',
        textAlign: 'center',
        borderRadius: '9999px',
        border: '1px solid #333',
        boxShadow:' inherit',
        backgroundColor:'#6E727F'

    }}

      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} 
      
      />}
    />
               <button type="submit"  className=" bg-yellow-50 text-black px-2 py-2 rounded-md mt-10" > VeriFy Email </button>
               </form>

               <div className=" flex justify-center items-center gap-x-6 "> 
                <Link to="/login"> Back To Login</Link>
                {/* ??Fix This */}
                 <button
                  onClick={()=>dispatch(sendOtp(signUpData.email,navigate))}
                 >Resend It </button>
               </div>
                </div>

                 )
             }
        </div>
    )
}

export default VerifyEmail;




