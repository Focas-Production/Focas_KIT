import { Home, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Tighter scroll activation
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Toast (optional) */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-auto bg-white text-blue-700 border border-black border-b-[5px] px-4 sm:px-6 py-2 rounded-full shadow-md z-[999] flex items-center gap-2 text-sm sm:text-base font-semibold">
          <X
            size={16}
            onClick={() => setShowToast(false)}
            className="cursor-pointer hover:text-red-500 transition"
          />
          <span className="truncate">Toast message here</span>
        </div>
      )}

      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl h-[60px] px-4 sm:px-6 md:px-8 lg:px-10 z-50 bg-white rounded-xl shadow-md flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'mt-2 shadow-[0_2px_12px_rgba(0,0,0,0.15)]' : 'mt-4'
        }`}
      >
        {/* Logo */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img
            src="/Images/logo.png"
            alt="Focus Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36"
          />
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-white border border-black border-b-[5px] rounded-full px-4 sm:px-5 py-2 text-blue-700 font-semibold hover:bg-blue-50 transition flex items-center gap-2 cursor-pointer"
        >
          <Home size={18} />
          <span className="text-xs sm:text-sm">Back To Home</span>
        </button>
      </div>

      {/* Spacer for navbar height */}
      <div className="h-[80px]" /> {/* Pushes content below navbar */}
    </>
  );
};

export default CartNav;
