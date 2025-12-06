import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const subjects = [
  {
    paper: "",
    title: "FOCAS Question Banks (Chapter-wise)",
    description: [
      "With the Last Attempt Kit Pro, jump straight into ICAI-grade question banks arranged chapter-wise and topic-wise. Attempt order guides what to do first, next, and last, helping you spot weak areas early and concentrate on high-yield practice. Save time, study smarter, and convert effort into marks every day.",
    ],
    shopLink:
      "https://pages.razorpay.com/stores/prokit/product/li_RXEAxIBPXBPBxH",
    samplePDF: "/pdf/Kit - QB - Sample.pdf",
    image: "/Images/Books/Both Group books.jpg",
    color: "border-blue-800",
  },
  {
    paper: "",
    title: "Tests with Video Review",
    description: [
      "With the Last Attempt Kit Pro, Write Chapter-wise, segment wise and full-length mock tests under a timer, then get rubric-based video corrections. See what cost you marks: missing headings, weak working notes, slow pacing, or poor selection. Fix the script, re-attempt the set, and watch your presentation, speed, and confidence rise significantly before Jan ’26.",
    ],
    shopLink:
      "https://pages.razorpay.com/stores/prokit/product/li_RXEAxIBPXBPBxH",
    samplePDF: "https://youtu.be/W5H-Y9oBhAY ",
    image: "/Images/Books/Test series.jpg",
    color: "border-red-500",
  },
  {
    paper: "",
    title: "FOCAS Planner",
    description: [
      " With the Last Attempt Kit Pro, Use the FOCAS Planner to map daily practice blocks, tests, and three revision passes. Track hours, topics, scores, and re-attempts with a simple scoreboard that exposes drift early. Weekly milestones keep you honest, so small wins compound into momentum and your preparation stays on schedule every week.",
    ],
    shopLink:
      "https://pages.razorpay.com/stores/prokit/product/li_RXEAxIBPXBPBxH",
    samplePDF: "/pdf/Planner Sample.pdf",
    image: "/Images/Books/Planner.jpg",
    color: "border-yellow-400",
  },
  {
    paper: "",
    title: "FOCAS Manual",
    description: [
      " With the Last Attempt Kit Pro, The FOCAS Manual teaches how to make it your last attempt in CA Intermediate : study sequence, answer presentation, and revision loops. Learn examiner expectations, preferred headings, working notes, keywords, and common traps. Follow the method, not mood, to turn good answers into marks and make this your Last Attempt consistently, under pressure.",
    ],
    shopLink:
      "https://pages.razorpay.com/stores/prokit/product/li_RXEAxIBPXBPBxH",
    samplePDF: "/pdf/LAK manual Sample.pdf",
    image: "/Images/Books/Manual.jpg",
    color: "border-yellow-400",
  },
  {
    paper: "",
    title: "Deep FOCAS + MCQ Marathon",
    description: [
      "With Last Attempt Kit Pro, you also join the Last Attempt Community. Our Deep FOCAS revision marathon gives you daily targets with the community, then tests for wide coverage, focused corrections, and speed on weak spots. Add weekly MCQ Marathons to lock retention and decision speed—repeat the right questions until mistakes disappear and performance holds under pressure.",
    ],
    shopLink:
      "https://pages.razorpay.com/stores/prokit/product/li_RXEAxIBPXBPBxH",
    samplePDF: "https://youtu.be/lynhdykH2X8",
    image: "/Images/Books/Both Group combo.jpg",
    color: "border-yellow-400",
  },
];

export default function LearnMoreSlider() {
  const [index, setIndex] = useState(0);
  const isMobile = window.innerWidth < 768;
  const containerRef = useRef(null);

  // Swipe gesture logic
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goNext(); // swipe left
    if (distance < -50) goPrev(); // swipe right
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const goNext = () => setIndex((prev) => (prev + 1) % subjects.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + subjects.length) % subjects.length);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(goNext, 5000);
      return () => clearInterval(interval);
    }
  }, [index, isMobile]);

  return (
    <div className="bg-white shadow-lg rounded-[32px] p-6 md:p-12 max-w-[90%] md:max-w-[76%] lg:max-w-6xl 2xl:max-w-7xl mx-auto my-12 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Last Attempt Kit
        </h2>
        <span className="text-sm font-medium text-gray-500">
          {index + 1}/{subjects.length}
        </span>
      </div>

      {/* Content */}
      <div className="relative min-h-[280px]">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {subjects.map((subject, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row w-full flex-shrink-0 px-6 sm:px-6 md:px-12 gap-6"
            >
              {/* Text Content */}
              <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
                <p className="text-lg text-gray-400 mb-2">{subject.paper}</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                  {subject.title}
                </h3>
                {subject.description.map((line, i) => (
                  <p
                    key={i}
                    className="text-gray-700 mb-3 text-base leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
                <a
                  href={subject.shopLink}
                  className="inline-block text-sm font-semibold text-blue-600 hover:underline mt-1"
                >
                  SHOP NOW
                </a>
              </div>

              {/* Image */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="w-52 sm:w-60 md:w-72 rounded-lg shadow-md mb-2"
                />
                <a
                  href={subject.samplePDF}
                  className="text-sm text-gray-500 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Sample
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows (Desktop Only) */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 hidden md:block"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 hidden md:block"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 cursor-pointer" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {subjects.map((sub, i) => (
          <span
            key={i}
            className={`w-4 h-2 rounded-full transition-all duration-300 ${
              i === index ? `${sub.color} bg-blue-500` : "bg-blue-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
