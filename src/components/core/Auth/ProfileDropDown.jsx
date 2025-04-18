import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToken } from "../../../Reducer/slices/authslice";
import { setUser } from "../../../Reducer/slices/profileSlice";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiDashboard2Line } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  console.log("User --> ",user );
  const dispatch = useDispatch();
  const getUserUrl = () => {
    return user.image;
  };

  const [showDropDown, setShowDropDown] = useState(false);
 


 useEffect(() => {getUserUrl();
  
   console.log("Triggered the UseEffect Getting Image Url "  ,getUserUrl());}
  , [user]);

  const clickHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container relative">
      <div className="group relative">
        <div className="flex gap-2 text-white items-center" onClick={clickHandler}>
          <img
            src={getUserUrl() || user.image}
            className="rounded-full w-[30px] h-[30px] object-cover"
          />
          <IoMdArrowDropdown />
        </div>
        {showDropDown && (
          <table className=" cursor-pointer absolute right-0  bg-richblack-800 text-white mt-2 py-2 w-32 rounded-lg shadow-lg border border-richblack-400">
            <tr className=" border-b border-b-richblack-400 py-2  cursor-pointer">
            <Link
              to="/dashboard/my-profile"
              className="flex gap-2  w-full px-4 py-2 text-sm hover:bg-richblack-700 "
            >
              Dashboard  <RiDashboard2Line/>
            </Link>
            </tr>
            <tr className=" py-2 rounded-md">
            <button
              onClick={() => {
                localStorage.setItem("token", null);
                dispatch(setToken(null));
              }}
              className=" w-full text-left px-4 py-2 flex gap-2 text-sm hover:bg-richblack-700"
            >
              Logout 
              <GrLogout/>
            </button>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
