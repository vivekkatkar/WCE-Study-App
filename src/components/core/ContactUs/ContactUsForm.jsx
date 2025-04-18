import { useState } from "react"
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import CTAButton from "../Homepage/CTAButton";
import { apiConnector } from "../../../services/apiConnector";
import  CountryCode from '../../../data/countrycode.json'
import { contactUsSender } from "../../../services/api";
import { useDispatch } from "react-redux";
const ContactUsForm = ()=>{
  const dispatch = useDispatch();
const [loading,setLoading] =useState(false);
const{
    register,handleSubmit,
    reset,formState:{errors,isSubmitSuccessful},


} =useForm();

useEffect(()=>{
    if(isSubmitSuccessful){
        reset({
            email:"",
            firstName:"",
            lastName:"",
            message:"",
            phonenumber:"",

        })
    }
},[isSubmitSuccessful,reset])

const submitContactForm = async (data)=>{

    console.log(data);
    setLoading(true);
     console.log("Calling ")
     const res = await dispatch(contactUsSender(data));
      
     console.log("Res of ContctUsSender ", res);
    
    setLoading(false);
}


    return(
        <form className="  w-full  flex flex-col gap-8 " onSubmit={handleSubmit(submitContactForm)}>
            <div className=" w-full  my-6   gap-4  lg:h-[100px]  flex  justify-between ">
                {/* FirstAnme */}
                <div className=" w-full  flex  flex-col gap-2">
                    <label htmlFor="firstName" >First Name</label>
                    <input type="text" name="firstName"
                     id="firstnane"  className="  lg:h-[50px] bg-richblack-800 rounded-md border-b-2 border-b-richblack-100"
                     placeholder="Enter First Name" 
                     {...register("firstName", {required:true})}
                     ></input>
                     {
                        errors.firstName && (
                            <span> Enter Your First Name </span>
                        )
                     }
                </div>
                {/* lastName */}
                <div className=" flex flex-col gap-2">
                    <label htmlFor="lastName" >Last Name</label>
                    <input className="  lg:h-[50px] bg-richblack-800 rounded-md border-b-2 border-b-richblack-100" type="text" name="lastName"
                     id="lastName" 
                     placeholder="Enter lastName Name" 
                     {...register("lastName", {required:true})}
                     ></input>
                     {
                        errors.lastName && (
                            <span> Enter Your Last Name  </span>
                        )
                     }
                </div>
                

             </div>
             {/* Email */}
 
 <div className=" flex flex-col gap-4">
    <label htmlFor="email">Please Enter Yopur Emaill</label>
    <input className=    "bg-richblack-800   lg:h-[50px] rounded-md border-b-2 border-b-richblack-100"
     type="email"
     name="email"
     id="email"
     placeholder="Enter Email"
     {...register("email",{required:true})}
    ></input>
 {
    errors.email && (
        <div> Enter Email </div>
    )
 }


 </div>
 {/* Phone Number  */}
 <div className="flex flex-col gap-4">
  <label htmlFor="phonenumber">Phone no.</label>
  <div className="flex gap-4 w-[100%]  items-center ">
    <div className=" flex flex-col w-[10%]"> 
      <select
        className="bg-richblack-800  lg:h-[50px] rounded-md border-b-2 border-b-richblack-100"
        name="dropdown"
        id="dropdown"
        {...register("countrycode", { required: true })}
      >
        {CountryCode.map((element, index) => (
          <option key={index} value={element.code}>
            {element.code}-{element.country}
          </option>
        ))}
      </select>
    </div>
    <div  className=" w-[80%] "> {/* Add flex-shrink-0 class here */}
      <input
        type="number"
        name="phonenumber"
        id="phonenumber"
        placeholder="9090909090"
        className="bg-richblack-800  lg:h-[50px] rounded-md border-b-2 border-b-richblack-100"
        {...register("phonenumber", {
          required: true,
          maxLength: { value: 10, message: "Invalid Phone No." },
          minLength: { value: 10, message: "Invalid Phone No." },
        })}
      />
      {errors.phonenumber && (
        <span className="text-red-500 ">{errors.phonenumber.message}</span>
      )}
    </div>
  </div>
</div>

{/* Contact us Textarea  */}
 <div className=" flex flex-col gap-4">
     <label htmlFor="message" >Enter Message</label>
     <textarea className="bg-richblack-800 rounded-md border-b-2 border-b-richblack-100"
     name="message"
     id="message"
     placeholder="Enter Your Message"
     cols={"30"}
     rows={"7"}
     {...register("message",{required:true})}
     ></textarea>
     {
        errors.message&&(
            <span> Enter Your Message g</span>
        )
     }
     <button type="submit" className=" w-[100%]  bg-yellow-50 text-black text-3xl font-semibold"  >Send Message</button>
 </div>
        </form>
    )
}
export default ContactUsForm;