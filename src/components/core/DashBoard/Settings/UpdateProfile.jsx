import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../services/api";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
    const {
        setValue,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    useEffect(() => {
        console.log("___USER___",user);
        const today = new Date();
         const todayDateString = formatDate(today);
        if (user) {
            setValue('firstName', user.firstName || '');
            setValue('lastName', user.lastName || '');
            setValue('about', user.additionalDetails?.about || '');
            setValue('gender', user.additionalDetails?.gender || '');
            setValue('contactNumber', user.additionalDetails?.contactNumber || '');
            setValue('dateOfBirth', user.additionalDetails?.dateOfBirth || todayDateString);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        console.log("Submit Clicked");
        console.log(data);
        dispatch(updateProfile(data, token));
    };

    return (
        <div className="w-full text-white flex flex-col gap-4 bg-richblack-800 rounded-md border-[1px] border-richblack-600 px-2 py-4">
            <p className="font-semibold text-3xl text-white">Profile Information</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                <div className="flex w-full gap-[50px]">
                    <label className="w-[50%]">
                        <p>First Name</p>
                        <input
                            {...register('firstName')}
                            type="text"
                            placeholder="First Name"
                            className="border-b-2 border-richblack-100 rounded-md bg-richblack-700 lg:h-[40px] w-full"
                        />
                    </label>
                    <label className="w-[50%]">
                        <p>Last Name</p>
                        <input
                            {...register('lastName')}
                            type="text"
                            placeholder="Last Name"
                            className="border-b-2 border-richblack-100 rounded-md bg-[#2c333f] lg:h-[40px] w-full"
                        />
                    </label>
                </div>

                <div className="flex justify-between items-center gap-[50px]">
                    <label className="w-[50%]">
                        <p>Date Of Birth</p>
                        <input
                            {...register('dateOfBirth')}
                            type="date"
                            className="border-b-2 border-richblack-100 rounded-md bg-richblack-700 lg:h-[40px] w-full"
                        />
                    </label>
                    <label className="w-[50%]">
                        <p>Gender</p>
                        <select
                            {...register('gender')}
                            className="border-b-2 border-richblack-100 rounded-md bg-richblack-700 lg:h-[40px] w-full"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>

                <div className="flex justify-between items-center gap-[50px]">
                    <label className="w-[50%]">
                        <p>Contact Number</p>
                        <input
                            {...register('contactNumber')}
                            type="text"
                            className="border-b-2 border-richblack-100 rounded-md bg-richblack-700 lg:h-[40px] w-full text-white"
                        />
                    </label>
                    <label className="w-[50%]">
                        <p>About</p>
                        <input
                            {...register('about')}
                            type="text"
                            className="border-b-2 border-richblack-100 rounded-md bg-richblack-700 lg:h-[40px] w-full"
                        />
                    </label>
                </div>

                <button type="submit" className="px-2 py-1 bg-yellow-50 self-center text-black text-xl rounded-md">Edit</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
