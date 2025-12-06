import { ArrowRight } from "lucide-react";
import React from "react";
import book from "../../../../public/Images/books.png";
import mockImg from "../../../../public/Images/book-card-sample.jpg";
import pdf from "../../../../public/Images/pdf.png";
import openBook from "../../../../public/Images/open-book.png";
import { useNavigate } from "react-router-dom";

const Metrials_Cards = ({ data }) => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/shop')
  }
  return (
    <div className="material-cards w-full max-w-[320px] mt-5 font-body">
      {/* Image Container */}
      <div className="w-full bg-gray-400/50 rounded-lg mb-4 flex-center">
        <img src={mockImg} alt="Image" className="" />
      </div>

      {/* Title and Arrow */}
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="font-semibold text-lg text-gray-700/80 flex-1 pr-2">
          {data.title}
        </h1>
        <button onClick={handleButtonClick} className="cursor-pointer">
          <ArrowRight color="#517ef1" size={20} className="flex-shrink-0" />
        </button>
      </div>

      {/* Date */}
      <div className="w-full mb-3">
        <h3 className="text-xs text-[#517ef1] font-medium">{data.date}</h3>
      </div>

      {/* Description */}
      <div className="flex items-start gap-2 mb-4">
        <img
          src={book}
          alt="Book"
          className="w-[20px] h-[20px] mt-1 flex-shrink-0"
        />
        <p className="text-sm text-gray-700 font-medium leading-relaxed">
          {data.Description}
        </p>
      </div>

      {/* Price Options */}
      <div className="w-full flex flex-col sm:flex-row gap-4">
        {data.pdf && (
          <div className="flex items-start gap-2 flex-1">
            <img
              src={pdf}
              alt="PDF"
              className="w-[18px] h-[18px] mt-3 flex-shrink-0"
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-700 font-semibold">Secure Pdf</p>
              <p className="text-sm text-gray-600">₹{data.pdf} onwards</p>
            </div>
          </div>
        )}

        {data.book && (
          <div className="flex items-start gap-2 flex-1">
            <img
              src={openBook}
              alt="Book"
              className="w-[18px] h-[18px] mt-3 flex-shrink-0"
            />
            <div className="flex flex-col">
              <p className="text-sm text-gray-700 font-semibold">Paper Book</p>
              <p className="text-sm text-gray-600">₹{data.book} onwards</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrials_Cards;
