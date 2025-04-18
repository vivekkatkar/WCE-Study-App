import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../Reducer/slices/cartSlice";



export default function RenderCartCourses (){
    const dispatch =useDispatch()
    const {cart} = useSelector((state)=>state.cart);

    

    return(
        <div className=" text-white flex flex-col gap-10 ">
                {
                    cart.map((course,index)=>(
                        <div >
                           {/* Left Image */}
                           <div className=" flex  items-center  gap-10" key={index}>
                            <img src={course.tumbnail} alt="CorseImage"
                             className=" lg:h-[200px] lg:w-[300px]  rounded-md "
                            ></img>
                             <div className=" flex flex-col gap-y-2">
                                <p className="  font-medium">{course?.courseName}</p>
                                <p className="text-richblack-500">{course?.category?.name}</p>
                                    <div className=" flex gap-x-2  items-center">
                                        
                                        <ReactStars
                                         count={5}
                                         size={20}
                                         edit={false}
                                         activeColor={"#ffd700"}
                                         emptyIcon={<MdOutlineStarBorder/>}
                                         fullIcon={<MdOutlineStar/>}
                                        />
                                        <span>{course?.ratingAndReviews.length}</span>
                                    
                                    </div>

                                </div>
                                <div className=" flex flex-col gap-y-2">
                                <button onClick={()=>dispatch(removeFromCart(course))}
                                     className=" text-pink-300 font-bold hover:bg-richblack-700  flex py-2 items-center flex-row gap-4 bg-richblack-600 rounded-md px-2 py-1"

                                    >

                                      <MdDelete/>
                                      <span className=" text-xl">Remove</span>
                                </button>
                                <p className=" text-yellow-100 font-semibold">Rs.   {course?.price}</p>
                                
                                </div>
                            </div>
                             {/* Right Wali Chij  */}
                             <hr 
                              className=" text-richblack-600 py-2 mt-2"
                             />
                        </div>
                    ))
                }         
        </div>
    )
}