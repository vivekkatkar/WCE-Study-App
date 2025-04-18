import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../../../services/api";
import { useNavigate } from "react-router-dom";

const  DeleteProfile = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
   function deleteAccount (){

     dispatch(deleteProfile(token,navigate))

   }
    return(
        <div className=" text-white  flex  border-[1px]  border-pink-300 gap-8 bg-pink-800  py-6 px-8  rounded-md   ">
           <div  className=" px-2 py-2 rounded-full bg-pink-900  self-start text-2xl ">
            <RiDeleteBinLine/>
           </div>
           <div className=" flex flex-col  gap-2">

            <h2>Delete Account</h2>

            <p>
            Would you like to delete account?

This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
            </p>

            <div className=" cursor-pointer" onClick={deleteAccount}>I want to delete my account.
              </div>
           </div>
        </div>
    )
}

export default DeleteProfile;