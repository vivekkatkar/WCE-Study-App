import React from "react";
import FrameImage from '../../assets/Images/frame.png'
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import { FcGoogle } from "react-icons/fc";
function Template({title,desc1,desc2,image,formtype,setIsLoggedIn,isLoggendIn}){

    return(
        <div className=" w-11/12 max-w-[1160px]  flex   justify-between  items-center py-12 mx-auto gap-x-12 gap-y-0  ">

            <div className=" flex gap-4 flex-col">
                <h1 className=" text-3xl font-semibold max-w-[600px]">{title}</h1>
                <p className="flex flex-col gap-2">
                    <span className="text-xl  text-[#afb2bf] ">{desc1}</span>
                   <i>  <span className="  text-[#32a5c5] font-bold">{desc2}</span></i>
                </p>
                 
                 {
                   formtype=== "signup" ? (<SignupForm setIsLoggedIn ={setIsLoggedIn}></SignupForm>) :(<LoginForm setIsLoggedIn={setIsLoggedIn}></LoginForm>)

                 }

                 <div className=" flex flex-row w-full items-center gap-x-2 ">
                      <div className=" w-full h-[1px] bg-richblack-700"></div>
                      <p>OR</p>
                      <div className=" w-full h-[1px] bg-richblack-700"></div>
                 </div>
               
               <button className=" flex items-center justify-center w-full bg-richblack-700 rounded-md font-md text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-2">
                <FcGoogle></FcGoogle>
                <p>Sign up with Google</p>
               </button>

            </div>

            <div className="relative w-[11/12] max-w-[450px]">
  <img
    src={FrameImage}
    alt="Pattern"
    width={558}
    height={504}
    loading="lazy"
    className="absolut z-[-4]  "
    style={{ /* additional styles if needed */ }}
  />

  <img
    src={image}
    alt="Pattern"
    width={558}
    height={504}
    loading="lazy"
    className="absolute -top-4 -left-4"
    style={{ /* additional styles if needed */ }}
  />
</div>

        </div>
    )
}

export default Template;

