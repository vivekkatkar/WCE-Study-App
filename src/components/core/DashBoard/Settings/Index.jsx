
import DeleteProfile from "./DeleteProfile";
import UpdateImage from "./UpdateImage"
import UpdateProfile from "./UpdateProfile"
const  Settings = () =>{

    return(
        <div className=" py-6 pt-14 lg:w-[800px] flex flex-col gap-y-10">
            <UpdateImage/>
            <UpdateProfile/>
            <DeleteProfile/>
            {/* Change PAssword */}
        </div>
    )
}

export default Settings;


