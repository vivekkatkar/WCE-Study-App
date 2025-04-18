import { useEffect, useState } from "react";
import { useForm  } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirmentFeild";
// import { setStep } from "../../../../Reducer/slices/courseslice"
import { setCourse, setEditCourse, setStep } from "../../../../../Reducer/slices/courseslice";
import IconBtn from "../../../../common/IconButton";
import toast from "react-hot-toast";
import { addCourse, getAllCategories } from "../../../../../services/api";
import ChipInput from "./ChipInput";
import Upload from "../Upload";


export default  function CourseInformationForm (){

   
    const {token} = useSelector((state)=>state.auth);

    // const {
    //     register,handleSubmit,
    //     setValue,
    //     getValue,
    //     // formStat:{errors},

    // } =  useForm();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    
    const dispatch = useDispatch();
   
    const {course,editCourse} = useSelector((state)=>state.course);
    console.log("editCourse ---- ",editCourse);
    const [loading,setLoading] = useState(false);
    // const [categories,setCategories] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    //  let c = ['a','b','c','d','e'];

    //Copy Couse Slice
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            // const categories = await fetchCategories()


            const categories = await dispatch(getAllCategories());
            console.log("-------  Printing All The Categories After BackeNd Call --------- " , categories );

            setCourseCategories(categories);
            setLoading(false);
            // console.log("Inside UseEffects .. ");
        };
        console.log("Course Categories ---- -- - - - ", courseCategories);
        if (editCourse) {
            // Add Another Things  -- added 
            console.log("Edit Course --> " , course);
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);

            console.log(" Setting  coursePrice -- " ,);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenifits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.tumbnail            );
            setValue('courseShortDesc',course.courseDescription);

            const afterUpdate  =  getValues();
            console.log("Data After editCourse ",afterUpdate);
        }
        getCategories();
    }, []);
    
    const isFormUpdated = ()=>{
       const currentValues = getValues();
       if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.Price ||
        // currentValues.courseTags !== course.tag ||
        currentValues.courseCategory !== course.category ||
        currentValues.courseBenifits !== course.whatYouWillLearn || 
        currentValues.courseRequirments.toString() !== course.instructions.toString() 
        // currentValues.courseImage !== course.thumbnail 
        )

       return true;

    return false;

    }

    // HAndles Next Butto n Click 
    const onSubmit = async (data)=>{
        
     if(editCourse)
     {
         const currentValues = getValues();
         console.log("---+++ Printing Current Values +++--- ", currentValues);
        if(isFormUpdated())
        {
        
        
        const formData = new FormData();
        formData.append("courseId" , course._id);
        if(currentValues.courseTitle !== course.courseName)
        {
           formData.append("courseName" , currentValues.courseTitle);

        }

        if(currentValues.courseShortDesc !== course.courseDescription)
        {
           formData.append("courseDescription" , currentValues.courseShortDesc);
             
        }

        if(currentValues.coursePrice !== course.Price)
        {
           formData.append("price" , currentValues.coursePrice);
             
        }
        if(currentValues.courseBenifits !== course.whatYouWillLearn)
        {
           formData.append("whatYouWillLearn" , currentValues.courseBenifits);
             
        }

        // if(currentValues.courseTags !== course.tag)
        // {
        //    formData.append("tag" , currentValues.courseTags);
             
        // }
      

        // Some Error Will Occur In Course Categoriesc 
        if(currentValues.courseCategory !== course.category)
        {
           formData.append("category" , currentValues.courseCategory);
             
        }

        if( currentValues.courseRequirments.toString() !== course.instructions.toString() )
        {
           formData.append("instructions" , JSON.stringify(currentValues.courseRequirments));
             
        }

        // if( currentValues.courseImage !== course.thumbnail )
        // {
        //    formData.append("thumbnail" , currentValues.courseImage);
             
        // }




        // Backend Call ToCreate Course 
        setLoading(true);
        // EditCourse Api  Send Token 
        setLoading(false);

        // if(result)
        // {
        //     setStep(2);
        //     dispatch(setCourse(result));
        // }
        
        }
        else{
            toast.error("No Changes Madec !!")
        }
        return ;

     }

     else{
        // New Course (Not Edit ) 
        
        // const formData = new FormData();
        // const currentValues = getValues();

        // console.log("Printing The Current Values " , currentValues);
        // console.log("Printing the Data " , data ) ;



        // formData.append("courseName" , currentValues.courseTitle);
        // formData.append("courseDescription" , currentValues.courseShortDesc);
        // formData.append("price" , currentValues.coursePrice);
        // formData.append("whatYouWillLearn" , currentValues.courseBenifits);
        // formData.append("tag" , currentValues.courseTags);
        // formData.append("category" , currentValues.courseCategory);
        // formData.append("instructions" , JSON.stringify(currentValues.courseRequirments));
        // formData.append("thumbnail" , currentValues.courseImage);
        // formData.append("status","Draft");

        // // /Api Call 
        // setLoading(true);
         
        // // formData, token Use Dispatch For Calling 
        // const result = "Api Call";

        // console.log(" Printing FormDat --->.,<<" ,formData);

        // setLoading(false);


        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", "Draft");
        formData.append("thumbnail" , data.courseImage);
        formData.append('courseTags',data.courseTags);

        console.log(" Logging The Data -->> " , data);


        setLoading(true);
        // console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA ===+++===+++=== ", formData);
        const result = await dispatch(addCourse(formData,token));
        console.log("Result Of Add Course  " , result);

        if(result) {

            console.log("Setting The Step ");
            dispatch(setStep(2));
            
            dispatch(setCourse(result));
        }

        setLoading(false);
       
        console.log("PRINTING result After  Backend Call ==++==++==++==++ ", result);
         


         
     }

    


    }
    
    return(
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
        <div>

            <label  htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='w-full bg-richblack-700 border-b-2 border-b-richblack-100 rounded-md  lg:h-[40px] px-2   '
            />
            {
                errors.courseTitle && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>

        <div>
            <label  htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className=' border-b-2 border-b-richblack-100 rounded-md  lg:h-[40px] px-2 min-h-[140px] w-full  bg-richblack-700'
                />
            {
                errors.courseShortDesc && (<span
                 className="  bg-pink-300"
                >
                    Course Description is required**
                </span>)
            }

        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'>Course Price<sup  className="  bg-pink-300" >*</sup></label>
            <input
            
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true
                })}
                className=' relative  pl-6  border-b-2 border-b-richblack-100 rounded-md  lg:h-[40px] px-2 w-full  bg-richblack-700'
            />
            <HiOutlineCurrencyRupee  className=' px-1 text-2xl  absolute top-1/2 translate-y-[-10%]  text-richblack-400 '/>
            {
                errors.coursePrice && (
                    <span className=" text-pink-200 ">Course Price is Required**</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select className="  border-b-2 border-b-richblack-100 rounded-md  lg:h-[40px] px-2  bg-richblack-700 text-black "
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required:true})}
            >
                <option value="" disabled
                 className=" bg-richblack-700"
                >Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}
                         className=" bg-richblack-700"
                        >
                            {category?.name} 
                        </option>
                    ))
                }

            </select>


            {errors.courseCategory && (
                <span>
                    Course Category is Required
                </span>
            )}
        </div>

        {/* create a custom component for handling tags input */}
        <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

        {/* create a component for uploading and showing preview of media */}
        
        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

        
        {/*     Benefits of the Course */}
        <div>
            <label>Benefits of the course<sup>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className=' border-b-2 border-b-richblack-100 rounded-md  lg:h-[40px] px-2 min-h-[130px] w-full  bg-richblack-700'
            />
            {errors.courseBenefits && (
                <span>
                    Benefits of the course are required**
                </span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div className=" flex items-center justify-center gap-4 ">
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300 px-2 py-1 rounded-md '
                    >
                        Continue Without Saving
                    </button>
                )
            }

               <IconBtn
                text={!editCourse ? "Next" : "Save Changes"}
                />
        </div>
    </form>


    )
}

