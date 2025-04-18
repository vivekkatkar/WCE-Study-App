import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
export  default function Cart(){
    //  Add Total Bad Mai 
   const {total,totalItems } =useSelector((state)=>state.cart)
    return(
    <div className="pt-10 text-white ">
        
           <h1 className="text-2xl font-semibold">Your Cart </h1>
           <p className=" py-4">{totalItems} Courses In Cart</p>
           <hr className=" py-2 text-richblack-600"></hr>
           {
            total >0 ? (
                <div className=" flex gap-6 justify-between">
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                    </div>
            ) : (<div>
                  Your Cart is Empty 
                </div>) 
           }
    </div>
)

}