import { useSelector } from "react-redux";
import RenderSteps from "./RenderSteps"
import { TbPointFilled } from "react-icons/tb";

export default function AddCourse() {


    const {step} = useSelector((state)=>state.course);
    return (
        <div className="text-white z-10 w-full mx-auto py-6">
            <h1 className=" py-4 ">Add Course</h1>
            <div className="flex flex-row gap-10 justify-between">
                <div className="">
                    <RenderSteps />
                </div>
                {
                    (step === 1 || step === 2) && (
                        <div className=" p-4 bg-richblack-700  lg:h-[400px] rounded-lg overflow-hidden max-h-max">
                        <p className="text-lg font-semibold mb-4">⚡ Course Upload Tips</p>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Set the Course Price option or make it free.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Standard size for the course thumbnail is 1024x576.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Video section controls the course overview video.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Course Builder is where you create & organize a course.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Information from the Additional Data section shows up on the course single page.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Make Announcements to notify any important updates.
                            </li>
                            <li className="flex items-center">
                                <span className="font-bold"><TbPointFilled /></span> Notes to all enrolled students at once.
                            </li>
                        </ul>
                    </div>
                    )
                }
                
            </div>
        </div>
    )
}
