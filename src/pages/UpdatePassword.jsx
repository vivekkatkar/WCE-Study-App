import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../services/api";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { setLoading } from "../Reducer/slices/authslice";
const UpdatePassword =  ()=>{
    const[showPass,setShowPass] = useState(false);
    const {loading} = useSelector((state)=> state.auth )
    const [formData,setFormData] = useState(
       {
        password:"",
        confirmpassword:"",

       }
    )

    const handleOnChange = (e)=>{
         
        setFormData((prevData)=>(
         {
            ...prevData,
            [e.target.name] :e.target.value,
         }
        ))
    }
    const dispatch = useDispatch();
    const location = useLocation();
    const handleOnSubmit = (e)=>{
           e.preventDefault();
           const token = location.pathname.split('/').at(-1);
           const {password,confirmpassword} = formData;
           dispatch(resetPassword(password,confirmpassword,token))

    }

    const [showConfirmPass,setShowConfirmPass] = useState(false);
    
   
    return(

        <div className=" text-white">
            <div>Hello Jii </div>

        {
           
            loading ? (<div>Loading...</div>) : (<div>

                <div> Create New Password  </div>
                <p>Almost done. Enter your new password and youre all set.</p>
                 <form  onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password <sup>*</sup></p>
                        <input
                         required
                         type={showPass ?"text" : "password"}
                         name="password"
                         value={formData.password}

                         onChange={handleOnChange}

                           
                        ></input>

                        <span
                         onClick={()=>{setShowPass(!showPass)}}
                        >
                            {
                                showPass ? <FaRegEyeSlash fontSize={24}/> : <FaRegEye fontSize={24}></FaRegEye>
                            }
                        </span>
                    </label>

                    <label>
                        <p>Confirm New Password <sup>*</sup></p>
                        <input
                         required
                         
                         type={showConfirmPass ?"text" : "password"}
                         name="confirmpassword"
                         value={formData.confirmpassword}

                         onChange={handleOnChange}

                           
                        ></input>
                         <span
                          onClick={()=>{setShowConfirmPass(!showConfirmPass)}}
                         >
                            {
                                showConfirmPass ? <FaRegEyeSlash fontSize={24}/> : <FaRegEye fontSize={24}></FaRegEye>
                            }
                        </span>
                    </label>
                  
                  <button
                   type="submit"

                  >Reset Password </button>

                 </form>
                 <div> 
                     <Link to="/login">

                        <p>Back To Login</p>
                     </Link>
                

                 </div>
            </div>)
        }

        </div>
    )
}

export default UpdatePassword;



