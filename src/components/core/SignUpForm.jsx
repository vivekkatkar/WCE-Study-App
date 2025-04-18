import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import './SignUpForm.css';
import { signUp, sendOtp } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setSignUp } from "../../Reducer/slices/authslice";

function SignupForm() {
  const { loading, signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("Student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    accountType: "Student",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    formData.accountType = accountType;
    
    const newFormData = { ...formData};
    console.log("Account Type is  :: ",accountType )
    console.log("The Form Data is ::::: ",newFormData);
    setFormData(formData);

    try {
      dispatch(setSignUp(formData));
      await dispatch(sendOtp(newFormData.email, navigate));
      toast.success("OTP Sent Successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Could not send OTP");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="bg-[#2c333f] max-w-max flex gap-4 py-2 px-4 rounded-3xl">
        <button
          type="button"
          id="butt1"
          onClick={(event) => {
            event.preventDefault();
            setAccountType("Student");
          }}
          className={`${accountType === "Student" ? "bg-black px-2 py-1 rounded-3xl" : ""} text-white `}
        >
          Student
        </button>
        <button
          type="button"
          id="butt2"
          onClick={(event) => {
            event.preventDefault();
            setAccountType("Instructor");
          }}
          className={`${accountType === "Instructor" ? "bg-black px-2 py-1 rounded-3xl" : "text-red-50"} text-white `}
        >
          Instructor
        </button>
      </div>
      <div>
        <div className="flex gap-4">
          <label>
            <p>First Name <sup>*</sup></p>
            <input
              className="border-b-2 border-b-richblack-200 px-2 w-[300px] h-[40px] bg-[#2c333f] rounded-md text-richblack-5"
              type="text"
              name="firstName"
              required
              onChange={changeHandler}
              placeholder="Enter Name"
              value={formData.firstName}
            />
          </label>
          <label>
            <p>Last Name <sup>*</sup></p>
            <input
              className="border-b-2 border-b-richblack-200 px-2 w-[300px] h-[40px] bg-[#2c333f] rounded-md text-richblack-5"
              type="text"
              name="lastName"
              required
              onChange={changeHandler}
              placeholder="Enter Name"
              value={formData.lastName}
            />
          </label>
        </div>
      </div>
      <label>
        <p>Email Address<sup>*</sup></p>
        <input
          className="border-b-2 border-b-richblack-200 px-2 w-full h-[40px] bg-[#2c333f] rounded-md text-richblack-5"
          type="email"
          name="email"
          required
          onChange={changeHandler}
          placeholder="Enter Email Id"
          value={formData.email}
        />
      </label>
      <label className="relative">
        <p>Create Password <sup>*</sup></p>
        <input
          className="border-b-2 border-b-richblack-200 px-2 w-full h-[40px] bg-[#2c333f] rounded-md text-richblack-5"
          type={showPassword ? "text" : "password"}
          name="password"
          required
          onChange={changeHandler}
          placeholder="Enter password"
          value={formData.password}
        />
        <span
          className="absolute right-3 bottom-1 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </label>
      <label className="relative">
        <p>Confirm Password <sup>*</sup></p>
        <input
          className="border-b-2 border-b-richblack-200 px-2 w-full h-[40px] bg-[#2c333f] rounded-md text-richblack-5"
          type={ confirmShowPassword ? "text" : "password"}
          name="confirmPassword"
          required
          onChange={changeHandler}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
        />
        <span
          className="absolute bottom-1 right-3 cursor-pointer"
          onClick={() => setConfirmShowPassword(!confirmShowPassword)}
        >
          {confirmShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </label>
      <button
        type="submit"
        className="w-full px-12 py-2 bg-[#ffd60a] rounded-md text-black font-semibold mt-3"
      >
        Create Account
      </button>
    </form>
  );
}

export default SignupForm;
