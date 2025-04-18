import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";

const tabsName = [
  "Free", "New to coding", "Most popular", "Skills paths", "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    console.log(value);
    setCurrentTab(value);
    const result = HomePageExplore.filter((courses) => (courses.tag === value));
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center px-4 lg:relative lg:px-0">
      <div className="flex flex-col text-center mb-10 ">
        <h1 className="text-3xl md:text-4xl text-white font-semibold">
          Unlock the <HighlightedText>Power Of Code</HighlightedText>
        </h1>
        <p className="text-white mt-2">Learn to Build Anything You Can Imagine</p>
      </div>

      <div className="flex mb-10  flex-wrap justify-center items-center gap-2 text-richblack-50 bg-richblack-800 rounded-3xl px-4 py-2">
        {tabsName.map((tab, index) => (
          <div
            key={index}
            className={`py-2 px-4 cursor-pointer hover:bg-richblack-900 hover:rounded-3xl transition-colors duration-200 ${tab === currentTab ? "bg-richblack-900 text-white px-4 py-2 rounded-3xl" : "text-richblack-50"}`}
            onClick={() => setMyCards(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className=" flex flex-wrap gap-4 lg:gap-6  mb-10 justify-center relative lg:top-0 lg:right-0 lg:w-full lg:py-8">
        {courses.map((course, index) => (
          <div
            key={index}
            onClick={() => setCurrentCard(course.heading)}
            className={`lg:absolute rounded-md  ${index%3 ==0 ? "right-0":""} ${index%3 ==1 ? "left-0":""} top-0 translate-y-[-20%] px-4 py-6 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] flex flex-col gap-4 ${currentCard === course.heading ? "bg-white text-richblack-700   border-b-8 border-r-8 border-b-yellow-50  border-r-yellow-50 " : "bg-richblack-800"} transition-all duration-300`}
          >
            <div className="text-xl font-semibold">{course.heading}</div>
            <div className="text-sm md:text-base">{course.description}</div>
            <div className="flex justify-between text-xs md:text-sm">
              <div>{course.level}</div>
              <div>{course.lessionNumber}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
