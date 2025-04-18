import { useEffect } from "react";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import HighlightedText from "../components/core/Homepage/HighlightedText";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimeLineSection";
import LearningLasnguageSection from "../components/core/Homepage/LearningLasnguageSection";
import Instructor from '../assets/Images/Instructor.png';
import ReviewSlider from '../components/core/Homepage/ReviewSlider';
import ExploreMore from "../components/core/Homepage/ExploreMore";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion"
import { fadeIn } from "../components/common/motionFrameVarients";

const HomePage = () => {
    

    return (
        <div>
            {/* Section 1 */}
            <div className="flex flex-col items-center relative justify-between w-11/12 max-w-7xl mx-auto">
                <Link to="/signup">
                    <div className="mt-16 bg-richblack-800 text-center text-richblack-200 transition-all duration-200 group border rounded-3xl p-2 md:p-4">
                        <div className="flex flex-row gap-2 md:gap-4 justify-between items-center scale-95 group-hover:bg-richblack-900">
                            <p className="text-white text-sm md:text-base">Become An Instructor</p>
                            <HiMiniArrowSmallRight className="text-xl md:text-3xl text-white" />
                        </div>
                    </div>
                </Link>

                
                <motion.div
                        variants={fadeIn('left', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount:0.1 }}
                        className='text-center text-white  text-3xl lg:text-4xl font-semibold mt-7  '
                    >
                        Empower Your Future with
                        <HighlightedText text={"Coding Skills"} />
                    </motion.div>

                <div className="text-center w-full md:w-4/5 font-bold text-richblack-300 mt-4">
                    <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                </div>

                <div className="flex flex-col md:flex-row mt-7 gap-4">
                    <CTAButton active={true} linkTo={"/signup"}>Learn More</CTAButton>
                    <CTAButton linkTo={"/login"} active={false}>Book a Demo</CTAButton>
                </div>

                <div className="shadow shadow-blue-200 mx-3 my-12">
                    <video loop autoPlay className="w-full h-auto">
                        <source src={Banner} />
                    </video>
                </div>

                {/* Code Section 1 */}
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={<div className="font-semibold gap-3 text-2xl md:text-4xl text-white">
                        Unlock Your <span className="font-bold text-richblue-200">coding potential</span> with our online courses
                    </div>}
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={{
                        active: true,
                        linkTo: "/signup",
                        btnText: "Try It Yourself"
                    }}
                    ctabtn2={{
                        active: false,
                        linkTo: "/login",
                        btnText: "Learn More"
                    }}
                    codeBlock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    codeColor={"text-yellow-100"}
                ></CodeBlocks>

                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={<div className="font-semibold gap-3 text-2xl md:text-4xl text-white">
                        Start <span className="font-bold text-richblue-200">coding in seconds</span>
                    </div>}
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={{
                        active: true,
                        linkTo: "/signup",
                        btnText: "Continue Lesson"
                    }}
                    ctabtn2={{
                        active: false,
                        linkTo: "/login",
                        btnText: "Learn More"
                    }}
                    codeBlock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a></nav>`}
                    codeColor={"text-blue-100"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                ></CodeBlocks>

                <ExploreMore />
            </div>

            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[300px] md:h-[333px] flex flex-col md:flex-row justify-center gap-4 pb-4 items-center">
                    <CTAButton active={true} linkTo={"/login"}>
                        <div className="flex justify-center items-center gap-2">
                            Explore Full Catalog <HiMiniArrowSmallRight className="text-xl" />
                        </div>
                    </CTAButton>
                    <CTAButton linkTo={"/signup"}>Learn More</CTAButton>
                </div>

                <div className="max-w-7xl mt-7 mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="text-2xl md:text-4xl font-semibold w-full md:w-3/5 gap-2">
                            Get the skills you need for a <span className="font-bold text-richblue-200">job that is in demand.</span>
                        </div>
                        <div className="flex flex-col gap-6 md:w-2/5">
                            <p className="w-full">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAButton active={true} linkTo={'/signup'}>Learn More</CTAButton>
                        </div>
                    </div>

                    <TimeLineSection />
                    <LearningLasnguageSection />
                </div>
            </div>

            {/* Section 3 */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-10 py-10">
                    <div className="relative flex flex-col">
                        <img src={Instructor} className="z-20" width={"900px"} alt="Instructor" />
                        <div className="w-[300px] md:w-[550px] h-[300px] md:h-[500px] bg-white absolute -top-6 -left-6"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-6">
                        <div className="text-white text-3xl md:text-4xl font-semibold flex flex-col">
                            Become an <HighlightedText>Instructor</HighlightedText>
                        </div>
                        <p className="text-white text-base md:text-lg">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        <CTAButton active={true}>
                            <div className="flex items-center gap-4">
                                Start Teaching Today <HiMiniArrowSmallRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <ReviewSlider />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
