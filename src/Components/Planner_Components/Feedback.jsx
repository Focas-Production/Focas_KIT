import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import plannerPic1 from "../../../public/files/images/planner/planner01.jpeg"
import plannerPic2 from "../../../public/files/images/planner/planner02.jpeg"
import plannerPic3 from "../../../public/files/images/planner/planner03.jpeg"
import plannerPic4 from "../../../public/files/images/planner/planner04.jpeg"


const testimonials = [
  {
    Userimage: `${plannerPic1}`,
  },
  {
    Userimage: `${plannerPic2}`,
  },
  {
    Userimage: `${plannerPic3}`,
  },
  {
    Userimage:`${plannerPic4}`,
  },
];

// Image-only card
const TestimonialCard = ({ Userimage }) => {
  return (
    <div className="w-full max-w-2xl flex justify-center mx-auto">
      <img
        src={Userimage}
        alt=""
        className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl border border-black"
      />
    </div>
  );
};

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev < testimonials.length - 1 ? prev + 1 : prev
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="w-full text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 sm:mt-5">
        FOCAS Planner Preview
      </h1>

      <div className="w-full mt-4 sm:mt-6 py-8 sm:py-10 relative">
        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex justify-center"
              >
                <TestimonialCard Userimage={t.Userimage} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 bg-[#a5ffaa] cursor-pointer border border-black border-b-4 shadow-lg"
            type="button"
          >
            <HiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex === testimonials.length - 1}
            className="rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:hover:scale-100 bg-[#a5ffaa] cursor-pointer border border-black border-b-4 shadow-lg"
            type="button"
          >
            <HiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
