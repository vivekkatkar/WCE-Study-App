import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconButton";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../Reducer/slices/courseslice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/api";
import NestedView from "./NestedView";
import { MdOutlineArrowRight } from "react-icons/md";

const CourseBuilderForm = () => {
   const {register ,
   handleSubmit,
   setValue,
   getValues,
   formState:{errors}
   } = useForm();

   const dispatch = useDispatch();
   const {token} = useSelector((state)=>state.auth);
   console.log("Token--" , token);
     const [loading,setLoading]= useState(false);
   const [editSectionName,setEditSectionName] = useState(null);
 const {course} = useSelector((state)=>state.course);

 console.log("Course Under Course Builder " ,course);
  function cancelEdit(){
      setValue('sectionName',"");
      setEditSectionName(null);

 }

 function goToNext(){
    console.log("hello");
     if(course?.courseContent?.length === 0)
     {
        toast.error("Please Add At least one Section ");
            return;
     }

     if(course.courseContent.some((section)=>section.subSection.length === 0 ))
     {
        toast.error("Please Add At least One lecture in Each SubSection");
        return;
     }

    dispatch(setStep(3));
 }

 function goBack(){
       dispatch(setEditCourse(true));
       dispatch(setStep(1));
 }

 const onSubmit =async(data)=>{
    let result;
    setLoading(true);
  if(editSectionName)
  {
    // Edit The Section Name

    result = await updateSection({
         sectionName : data.sectionName,
         sectionId:editSectionName,
         courseId:course._id,
    },token);

  }
  else{
    //   Create Section

    result = await createSection({
        sectionName : data.sectionName,
        courseId:course._id,
    },token);
  }

  if(result)
  {
     // section updated or created
     dispatch(setCourse(result));
     setEditSectionName(null);
     setValue('sectionName',"");
  }

   setLoading(false);

 }

 const handleChangeEditSectionName=(sectionId,sectionName)=>{
    if(editSectionName === sectionId)
    { 
        cancelEdit();
        return;
    } 
   setEditSectionName(sectionId);
   setValue('sectionName',sectionName);
 }
    return(
        <div className=" text-white ">
            <p className=" my-2 "> Course Builder </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex gap-2 items-center ">
                    <label htmlFor="sectionName">Section Name<sup className=" text-pink-300">* </sup></label>
                    <input 
                      id="sectionName"
                      placeholder="Add Section Name"
                      {...register('sectionName',{required:true})}
                     className=" border border-black rounded-md lg:h-[40px]  bg-richblack-700 w-[70%]  "
                     >
                    </input>
                    {
                       errors.sectionName &&(
                        <span> Section Name is Required</span>
                       )
                    }
                </div>
                <div className=" my-10 ml-2 flex gap-4 items-center">
                    <IconBtn 
                     type="submit"      
                      text = {editSectionName ? "Edit Section Name  " : "create Section"}
                      outline={true}
                      
                    > <div className=" font-bold"><IoIosAddCircleOutline className=" font-bold"/> </div> </IconBtn>
                    {
                        editSectionName &&(
                            <div onClick={cancelEdit} className=" text-sm underline text-richblack-500 cursor-pointer"> Cancel Edit </div>
                        )
                    }
                </div>
            </form>

            {/* Nested View */}

            {
                course?.courseContent?.length >0 &&(
                    <NestedView 
                     handleChangeEditSectionName={handleChangeEditSectionName}
                    />

                )
                

            }
            <div className=" flex gap-4 ">
                <button 
                 onClick={goBack}
                className=" bg-richblack-800 text-white px-2 py-1 rounded-md">
                      Back
                </button>

                <button>
                   <IconBtn onClick={goToNext} text={"Next"}> <MdOutlineArrowRight/> </IconBtn>
                </button>
            </div>
            
        </div>
    )
}

export default CourseBuilderForm;
