import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconButton"

import { buyCourse } from "../../../../services/studentFeaturesApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RenderTotalAmount (){
    const {total,cart} = useSelector((state)=>state.cart);
     const {token} = useSelector((state)=>state.auth);
     const {user} = useSelector((state)=>state.profile);

     const navigate = useNavigate();
     const dispatch = useDispatch();
    const handleBuyCourse = async ()=>{
        let courseIds = [];
        cart.forEach((c)=>{
            courseIds.push(c._id);
            // console.log(c._id);
        })
        if(token)
        {
            buyCourse(token, courseIds, user, navigate, dispatch);
            // toast.success("All Courses Bought Successfully !");
            return;

        }

        
        
      

    }
    return(
        <div className=" bg-richblack-700 border border-richblack-300 rounded-md px-10 lg:h-[200px] hover:bg-richblack-900 py-4 flex flex-col gap-y-10">
              <p className=' flex flex-col gap-x-2  font-semibold text-3xl  text-yellow-50'>Total : <p>Rs. {total}</p> </p>
              
              <IconBtn
              text={"Buy Now"}
              onClick={handleBuyCourse}
              customClasses={" w-full justify-center"}
              />
        </div>
    )
}