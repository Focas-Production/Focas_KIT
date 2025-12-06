import { ShoppingCart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Replace with your Razorpay checkout link
  const razorpayLink = "https://rzp.io/l/YOUR_CHECKOUT_LINK";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShopNowClick = () => {
    window.open("https://pages.razorpay.com/stores/st_R2NAf1qLQOhkt4", "_blank");
  };

  return (
    <div
      className={`relative w-[90%] h-[60px] px-4 sm:px-6 md:px-8 lg:px-10 left-1/2 transform -translate-x-1/2 rounded-xl shadow-[0px_2px_8px_2px_rgba(0,_0,_0,_0.1)] flex items-center justify-between bg-white z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "top-4" : "top-10"
      }`}
    >
      {/* Logo */}
      <h1 onClick={() => navigate("/")}>
        <img
          src="/Images/logo.png"
          alt="Focus Logo"
          className="w-24 sm:w-28 md:w-32 lg:w-36 cursor-pointer"
        />
      </h1>

      {/* Shop Now Button */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 font-secondary">
        <button
          onClick={handleShopNowClick}
          className="bg-white border border-black border-b-[5px] rounded-full px-4 sm:px-5 py-2 text-blue-700 font-semibold hover:bg-blue-50 transition flex items-center gap-2 cursor-pointer"
        >
          <ShoppingCart size={18} />
          <span className="text-xs sm:text-sm">Shop Now</span>
        </button>
      </div>
    </div>
  );
};

export default Nav;
