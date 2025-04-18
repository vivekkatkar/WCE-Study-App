import toast from 'react-hot-toast';
import {setLoading,setToken} from '../Reducer/slices/authslice'
import { apiConnector } from './apiConnector';
import axios from 'axios';
// import { setToken } from '../Reducer/slices/authslice';
import { setUser } from '../Reducer/slices/profileSlice';
import { resetCart } from '../Reducer/slices/cartSlice';


const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("Printing The Result WEB ",BASE_URL  + '/getAllCategories')
export const categories = { 
     CATEGORIES_API : BASE_URL  + '/getAllCategories',
   
}


export  function getAllCategories(){
  const CATEGORIES_API  =  BASE_URL  + '/getAllCategories' ; 

  return async(dispatch)=>{
     try{

      const categories  = await  apiConnector("GET" , CATEGORIES_API );
      console.log(categories);

      return categories.data.data;

     }
     catch(e){
       console.log("Error While Fetching The Categoriues "  , e);

     }


  }
  
}



const backEndUrl = "http://localhost:4000/api";
export function getPasswordResetToken(email,sentEmail){

     const resetPasswordToken = BASE_URL  + '/resetPasswordToken'
    //  console.log("Url-->",resetPasswordToken)
     return async(dispatch)=>{
          dispatch(setLoading(true));
             try{
              //  console.log("Email is " , email);
                   const response = await  apiConnector("POST",resetPasswordToken,{email})
                   console.log("Response from Fronternd for reset Token " ,response)
                   if(!response.data.success){
                    toast.error(response.data.message);
                     throw new Error(response.data.message);

                   }
                   toast.success("Reset Password Email Sent !");
               
              




                   sentEmail(true);
             }
             catch(e){
               toast.error(e.message)
                 console.log("Error While Reset PAssword  Token ",e);
             }
             dispatch(setLoading(false))
     }
     

}

export function resetPassword  (password,confirmPassword,token){
    return async (dispatch)=>{
         dispatch(setLoading(true));
         const RESET_PASSWORD = BASE_URL +'/resetPassword'

         try{
           const response = await apiConnector("POST",RESET_PASSWORD,{password,confirmPassword,token});
           console.log("Reset Pass ", response);

           if(!response.data.success )
           {
               throw new Error (response.data.message);
           }

           toast.success("Password Updated SucceSSFully !");

         }
         catch(e){
            console.log("Error In Reset Password ",e);
         }
         dispatch(setLoading(false));
     }
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, contactNumber, navigate) {
  const url = BASE_URL + '/signup';
  console.log("Entery ");
  console.log(url);
  return async (dispatch) => {
      dispatch(setLoading(true));
      try {
          const response = await apiConnector("POST", url, { accountType, firstName, lastName, email, password, confirmPassword, otp, contactNumber });
          console.log("Response on sign Up ", response);
          // localStorage.setItem("user",JSON.stringify(response.data.user))
          console.log("Verify Email Success ? ", response.data.success);
          if (response.data.success === false) {
              throw new Error("Error While Sign up");
          }
          toast.success("Signup SuccessFull ");
          navigate("/");
          dispatch(setLoading(false));
         
      } catch (e) {
          console.log("Error While Signing Up .............", e);
          toast.error(e.message); // Display the error message instead of the entire error object
          dispatch(setLoading(false));
      }
      
  };
}


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const SENDOTP_API = BASE_URL + '/sendotp';
      const response = await apiConnector("POST", SENDOTP_API, { email });
    console.log(response)
      console.log("SENDOTP API RESPONSE............", response);
      console.log(response.data.success);

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
   
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } 
    
    catch (error) {
      console.error("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function login(email, password, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

   const  LOGIN_API= BASE_URL+'/login';
   console.log(LOGIN_API);

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password
      }
     )

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
       localStorage.setItem("token", JSON.stringify(response.data.token))
       localStorage.setItem("user",JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function contactUsSender (data){
  const contactUsApi = 'http://localhost:4000/api' + '/contact-us'
  console.log(contactUsApi)
  return async(dispatch) =>{
    try{
      

       const response  =await apiConnector("POST",contactUsApi,data);
      // const response ={status:"OK",success:"true"};
      if(!response.data.success)
      {
        throw new Error("Eoor While Sending Error  ");
      }
      toast.success("Message Sent SuccessFully ");
       console.log(response); 
    }
    catch(e){
      toast.error(e.message);
        console.log(e);
    }
  }
}

export  function logout (navigate){

   return  async (dispatch)=>{
    localStorage.clear();
    
    dispatch(setToken(null));
    dispatch(setLoading(null));
    dispatch(resetCart());
    dispatch(setUser(null));
    
    toast.success("Looged Out SuccessFully  .. ")
    navigate('/');
    window.location.reload(true);

  }
}

export function updateProfile (formData,token){
 
  const url= BASE_URL + '/updateProfile';
   const toastId = toast.loading("LOADING . . .")
  return async(dispatch)=>
  {
    console.log("Ins services For Api of Updatae Profilr ---------")
    try{
      const response = await apiConnector("POST",url,formData,{
        Authorization: `Bearer ${token}`,
      });
      toast.dismiss(toastId);

      console.log(response);
      toast.success("Profile Updatded SuccesssFully ")
    


      if(response.data.updatedUser !== undefined)
      {
        localStorage.setItem("user",JSON.stringify(response.data.updatedUser));
        dispatch(setUser(response.data.updatedUser));
      }
      
      console.log("Response From BackEnd " , response);
    }
       catch(e)
       {
        console.log("Error---------",e);
       }
       toast.dismiss(toastId);
  }
    
}


export function updateProfileImage(formData, token) {
  const url = `${BASE_URL}/updateProfileImage`;

  return async (dispatch) => {
    console.log("In services for API of Update Profile Image");
    try {
      const response = await apiConnector("POST", url, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("Response of updateProfileImage:", response);
       console.log("User Is :: " ,response.data.user);
      if (response.data && response.data.user !== undefined ) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(setUser(response.data.user));
      } else {
        console.warn("Unexpected response structure:", response);
      }
    } catch (e) {
      console.error("Error in updateProfileImage:", e);
    }
  };
}


export  function deleteProfile(token,navigate){
 const url = BASE_URL + '/delete-profile';
  return async(dispatch)=>{

     try{
      const response  =  await apiConnector("DELETE",url,null,{
        Authorization: `Bearer ${token}`,
      },null);
    
      toast.success("User Deleted SuccessFully !")
      navigate("/");
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.clear();
      // console.log("User Deleted SucceessFully ----------------",response.data);

     }
     catch(e){
      console.log("------Error0------",e)
     }
   
    
  }
}




// export function addCourse(){
//    const addCourseApi =  BASE_URL + '/createCourse';

//    return async(formData , token , dispatch)=>{

//     console.log("FormData Inside The AddCourses And Token "   , token)

//      try{
//          const result = await apiConnector("POST" ,addCourseApi , formData , {
//           Authorization: `Bearer ${token}`,
//         }  , null )

//         console.log('Result Of Add Course Api - - - - - - - - - - - -' , result);


//         return result;
//      }

//      catch(e){
//       console.log("Error Occured While Adding The Course ");
      
//      }

//    }

// }


// export const addCourse = async (data, token , dispatch) => {
//   let result = null
//   const addCourseApi =  BASE_URL + '/createCourse';

//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", addCourseApi, data, {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     })

//     console.log("CREATE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Course Details")
//     }

//     toast.success("Course Details Added Successfully")
//     result = response?.data?.data
//   } 
//   catch (error) {
//     console.log("CREATE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }

//   toast.dismiss(toastId);


//   return result;
// }


export  function addCourse(data,token,dispatch){
  // const CATEGORIES_API  =  BASE_URL  + '/getAllCategories' ; 
  let result = null
  const addCourseApi =  BASE_URL + '/createCourse';

  return async()=>{
    try {
        const toastId = toast.loading('Adding')
      const response = await apiConnector("POST", addCourseApi, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
  
       toast.dismiss(toastId)
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
  
      toast.success("Course Details Added Successfully")
      result = response?.data?.data;

      return result;
    } 
    catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    

  }
  
}

export async function deleteCourse(data){
  const deleteCourseApi = BASE_URL + '/deleteCourse';
      try{
         const result = await apiConnector('POST',deleteCourseApi,data);
         console.log("Result of Delete Course <><><><> ",result);
      }
      catch(e){
        console.log(e);
      }
}

export async function updateCourseStatus(data){
  console.log("Call Recived ");
  const updateCourseStatusapi = BASE_URL + '/updateCourseStatus'
  try{
        const result = await  apiConnector('POST', updateCourseStatusapi,data);
        console.log("result of Update Status " , result);

        return result.data.data;
  }
  catch(e)
  {
    console.log("Error" ,e);
  }
}


export async function showAllCourses(){
   const showAllCoursesApi = BASE_URL + '/showAllCourses'
  try{
     const result = await apiConnector('GET',showAllCoursesApi);
     console.log('Result of Get All Courses -=-=-=-=-' , result);
     return result.data.data;
  }
  catch(e)
  {
    console.log(e);
  }
}


export  async function createSection(data,token){
 
  let result = null
  const createSectionApi =  BASE_URL + '/createSection';
 console.log("Data Inside The createSection Api ----" ,data,{
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
})
  
    try {
    
       result = await apiConnector("POST",createSectionApi,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      console.log("Response Of create Section Api --- -- - - - - " , result.data.data);
       return result.data.data;
    } 
    catch (error) {

      console.log("CREATE Section  API ERROR............", error)
      toast.error(error.message)
    }
    

  }
  


  export async function updateSection(data, token) {
    const updateSectionApi = BASE_URL + '/updateSection';
  
    try {
      const result = await apiConnector("POST", updateSectionApi, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
  
      console.log("Response Of updateSection --- -- - - - - ", result.data.data);
      return result.data.data;
    } catch (error) {
      console.log("updateSection API ERROR............", error);
      toast.error(error.message);
      return null;
    }
  }

export  async function deleteSection(data,token){
 
  let result = null
  const deleteSectionApi =  BASE_URL + '/deleteSection';

  
    try {
    
       result = await apiConnector("POST",deleteSectionApi,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

       console.log("Response Of deleteSection --- -- - - - - " , result.data.data);
       return result.data.data;
    } 
    catch (error) {

      console.log("deleteSection   API ERROR............", error)
      toast.error(error.message)
    }
    


  
}

export async function createSubSection(data,token){
 
  let result = null
  const createSubSectionApi =  BASE_URL + '/createSubSection';
 console.log( "create Sub Section " , data);
    try {
    
       result = await apiConnector("POST",createSubSectionApi,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

       console.log("Response Of createSubSection --- -- - - - - " , result);
       return result.data.data;
    } 
    catch (error) {

      console.log("createSubSection   API ERROR............", error)
      toast.error(error.message)
    }

  
}


export  async  function deleteSubSection(data,token){
 
  let result = null
  const deleteSubSectionApi =  BASE_URL + '/deleteSubSection';

  
    try {
    
       result = await apiConnector("POST",deleteSubSectionApi,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

       console.log("Response Of deleteSubSection --- -- - - - - " , result);
       return result;
    } 
    catch (error) {

      console.log("deleteSubSection   API ERROR............", error)
      toast.error(error.message)
    }
    

 
}


export async  function updateSubSection(data,token){
 
  let result = null
  const updateSubSectionApi =  BASE_URL + '/updateSubSection';

  
    try {
    
       result = await apiConnector("POST",updateSubSectionApi,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

       console.log("Response Of updateSubSection --- -- - - - - " , result);
       return result.data.data;
    } 
    catch (error) {

      console.log("updateSubSection   API ERROR............", error)
      toast.error(error.message)
    }
    


  
}


export async function getCatalogPageData(categoryId){
   console.log("Call to getCatalogPageData");
   let result = [];
   const catalogPageDetailsUrl = BASE_URL+'/getCategoryPageDetails';
   const toastId = toast.loading('Loading');
  try{
        const response = await apiConnector('POST',catalogPageDetailsUrl,{categoryId});
        toast.dismiss(toastId);
        console.log('Response is Here babe ',response);
        if(!response.data?.success)
        {
          throw new Error("Could Not Fetch Data");
        }

        result = response?.data;

        return result;
  }
  catch(e)
  {
    toast.error(e.message);
    console.log("Error In category Page Details");
  }

  toast.dismiss(toastId);
  return result;
}


export const getstudentEnrolledCourses = async(token)=>{
  const api = BASE_URL + '/studentEnrolledCourses';
  const toastId = toast.loading('loading .. ')
  try{
    if(!token)
    {
      throw new Error("User Not logged in ");
    }

    const result = await apiConnector('POST',api,null,{
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("Result of getting Enrolled Students" ,result.data.data.courses);
     toast.dismiss(toastId);
    return  result.data.data.courses;
  }
  catch(e)
  {
    console.log("Error While Getting Student Details At frontend ",e);
  }
  toast.dismiss(toastId);
}


export const fetchCourseDetails = async(courseId)=>
{
  const url = BASE_URL + '/getCourseById';
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", url, {
      courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error);
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  const GET_FULL_COURSE_DETAILS_AUTHENTICATED = BASE_URL + '/getFullCourseDetails'
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let CREATE_RATING_API = BASE_URL + '/createRating'
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    toast.dismiss(toastId);
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}

export const updateCourseProgressDetails = async(data,token)=>{
 
 


  try{

     const api = BASE_URL + '/updateCourseProgressDetails';
     const response = await apiConnector('POST',api,data,{
      Authorization: `Bearer ${token}`,
    });

   

    console.log("Response -->>",response);
    
    
   }
  catch(e)
  {
    console.log("Error Ocuured" ,e);
  }

 
}

export const instructorDashboard = async(token)=>{
  try{
    const api = BASE_URL + '/instructorDashboard';

    const response = await apiConnector('POST',api,null,{
      Authorization: `Bearer ${token}`
    })
    console.log("response of instructor DashBoard ",response);
    return response.data.data;
    
  }
  catch(e)
  {
    console.log("Error ",e);

  }
}
export const fetchInstructorCourses = async (token) => {
  const GET_ALL_INSTRUCTOR_COURSES_API = BASE_URL + '/getInstructorCourses';
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE............", response.data.data)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    toast.dismiss(toastId)
    return response?.data?.data
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// router.post('/createSection',createSection);
// router.post('/updateSection',updateSection);
// router.post('/deleteSection',deleteSection);

// router.post('/createSubSection',createSubSection);
// router.post('/deleteSubSection',deleteSubSection);
// router.post('/updateSubSection',updateSubSection);







