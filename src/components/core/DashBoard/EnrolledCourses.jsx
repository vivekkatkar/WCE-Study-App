import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getstudentEnrolledCourses } from "../../../services/api";
import { formattedDate } from "../../../utils/dateFormatter";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const navigate = useNavigate();

    // Backend Call (N/W) Call 
    const { user } = useSelector((state) => state.profile);

    const getEnrolledCourses = async () => {
        try {
            const response = await getstudentEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (e) {
            console.log("Unable to fetch Enrolled Courses");
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    const getTimeDuration = (course) => {
        let totalTimeInSeconds = 0;

        course?.courseContent?.forEach(section => {
            section?.subSection?.forEach(subSection => {
                totalTimeInSeconds += Number(subSection?.timeDuration) || 0;
            });
        });

        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const formattedTime = `${hours}hr ${minutes}min`;
        return formattedTime;
    };

    return (
        <div className="text-white">
            <div className="pt-10 text-4xl pb-4">Enrolled Courses</div>
            {!enrolledCourses ? (
                <div></div>
            ) : (
                <div>
                    {!enrolledCourses.length ? (
                        <div className="w-full h-full flex items-center justify-center">You Have Not Enrolled in any course Yet</div>
                    ) : (
                        <div className="overflow-x-auto w-full "
                          

                        >
                            <table className="w-full divide-y divide-richblack-500">
                                <thead className="bg-richblack-700 text-richblack-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Course Name</th>
                                        <th className="px-4 py-2 text-left">Duration</th>
                                        <th className="px-4 py-2 text-left">Progress</th>
                                        <th className=" px-4 py-2"></th>
                                        <th className=" px-4 py-2"> </th>
                                    </tr>
                                </thead>
                                <tbody className=" w-full ">
                                    {enrolledCourses.map((course, index) => (
                                        // <div
                                        
                                        //   className=" cursor-pointer w-full "
                                        // >
                                        <tr key={index} className=" w-full  items-center  border-b border-l border-r border-richblack-500">
                                            <td className="px-4 py-2 flex items-center gap-2">
                                                <img src={course.tumbnail} alt="Thumbnail" className="h-[50px] w-[50px] rounded-md" />
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-lg">{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                {getTimeDuration(course)}
                                            </td>
                                            <td className="px-4 py-2">
                                                <p>Progress: {course.progressPercentage || 50}%</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 50}
                                                    height="8px"
                                                    isLabelVisible={false}
                                                />
                                            </td>

                                            <td className=" hover:cursor-pointer">
                                                <SlOptionsVertical/>
                                            </td>

                                            <td className=" px-1 " ><div onClick={()=>{
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                              )
                
                                          }} className=" flex  items-center justify-center text-black self-center py-1 rounded-md bg-yellow-50 ">View Course </div></td>
                                        </tr>
                                        // </div>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
