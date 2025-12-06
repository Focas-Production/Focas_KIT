import React from "react";
import Metrials_Cards from "../Metrials_Cards/Metrials_Cards";

const Hero = () => {
  const data_1 = {
    title: "Title of the Book 1",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste unde dolor pariatur sapiente",
    date: "SEPT'25 & JAN'26",
    pdf: 150,
    book: 450,
  };

  const data_2 = {
    title: "Title of the Book 2",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste unde dolor pariatur sapiente",
    date: "SEPT'25 & JAN'26",
  };

  const courseData = [
    { name: "Foundation", date: "SEPT'25 & JAN'26" },
    { name: "Intermediate", date: "SEPT'25 & JAN'26" },
    { name: "Final", date: "SEPT'25 & JAN'26" },
  ];

  const sections = [
    { title: "CA Foundation", data: [data_1, data_2] },
    { title: "CA Inter", data: [data_1, data_2] },
    { title: "CA Final", data: [data_1, data_2] },
  ];

  return (
    
    <div className="w-[95%] sm:w-[90%] lg:w-[80%] mx-auto min-h-screen flex flex-col lg:flex-row mt-20">
      {/* Left Sidebar - Hidden on screens below 600px */}
      <div className="hidden min-[600px]:block w-full lg:w-[30%] border-t border-gray-400/50 h-fit lg:h-full">
        <h1 className="w-full h-[60px] border-b border-gray-400/50 flex items-center justify-start text-gray-400 font-body text-base sm:text-lg px-3 sm:px-5">
          Filtered by Course
        </h1>
        <div className="flex justify-around items-center pb-5 lg:block">
          {/* Chartered Accountancy Section */}
          <div className="mt-5 font-body px-3 sm:px-5">
            <h1 className="font-bold text-base sm:text-lg">
              Chartered Accountancy
            </h1>
            <ul className="">
              {courseData.map((course, index) => (
                <li
                  key={index}
                  className="text-sm mt-3 font-semibold text-stone-700 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  {course.name}{" "}
                  <span className="text-[8px] text-blue-400">
                    {course.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
              
          {/* Test Series Section */}
          <div className="mt-8 sm:mt-10 font-body px-3 sm:px-5">
            <h1 className="font-bold text-base sm:text-lg">Test Series</h1>
            <ul className="">
              {courseData.map((course, index) => (
                <li
                  key={index}
                  className="text-sm font-semibold mt-3 text-stone-700 cursor-pointer hover:text-red-600 transition-colors"
                >
                  {course.name}{" "}
                  <span className="text-[8px] text-red-400">
                    {course.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right Content Area - Full width on mobile */}
      <div className="w-full lg:w-[70%] border-gray-400/50 border-t lg:border lg:border-b-transparent lg:border-r-transparent h-fit lg:h-full font-body">
        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="w-full mt-6 sm:mt-8 lg:mt-15 flex flex-col items-center"
          >
            <h1 className="text-[30px] font-bold mb-6 sm:mb-8">
              {section.title}
            </h1>

            {/* Materials Cards Container */}
            <div className="w-full max-w-6xl px-2 sm:px-4 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {section.data.map((cardData, cardIndex) => (
                  <div key={cardIndex} className="flex justify-center">
                    <Metrials_Cards data={cardData} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
