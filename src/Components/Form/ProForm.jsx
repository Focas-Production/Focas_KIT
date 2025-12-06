import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function FormPage() {
     const navigate = useNavigate();
     const [showDropdown, setShowDropdown] = useState(false);
 const [formData, setFormData] = useState({
   name: "",
   sroNumber: "",
   email: "",
   phone: "",
   order: [], 
   examDate: "",
   address: "",
   pincode: "",
   city: "",
   state: "",
 });


  const questionTypes = [
    "LAK - Both Groups Combo",
    "LAK - Group 1 Combo",
    "LAK - Group 2 Combo",
    "LAK - Advanced Accounting",
    "LAK - Corporate & Other Laws",
    "LAK - Taxation",
    "LAK - Audit",
    "LAK - Financial & Strategic Management",
    "LAK - Focas Planner"
  ];

  const examOptions = ["Jan’26", "May’26", "Beyond"];

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyc9P09iX6vmcAiLkllgAG6sCf3mP6-7pWv64JiCBrPdN1C-LY6KozH6HJnzopTZODC/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await fetch(scriptURL, {
       method: "POST",
       mode: "no-cors",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         ...formData,
         order: formData.order.join(", "), // convert array to string
       }),
     });

      // ✅ Redirect to success page
      navigate("/proform/success", { state: { from: "/proform" } });
 // <- This will show your SuccessPage

   
      setFormData({
        name: "",
        sroNumber: "",
        email: "",
        phone: "",
        order: "",
        examDate: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
      });
    } catch (err) {
      console.error("Error submitting form", err);
      alert("❌ Failed to submit form. Try again.");
    }
  };

const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl transform transition-transform duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-[#0f0098] mb-8">
          Pro Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* SRO Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              SRO Number
            </label>
            <input
              type="text"
              name="sroNumber"
              value={formData.sroNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your SRO Number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number (WhatsApp)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter WhatsApp number"
            />
          </div>

          {/* Order */}
          <div className="md:col-span-1 relative" ref={dropdownRef}>
            <label className="block text-gray-700 font-medium mb-2">
              What did you order?
            </label>

            {/* Dropdown button */}
            <div
              className="border border-gray-300 rounded-xl p-3 bg-white cursor-pointer flex justify-between items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-gray-700">
                {formData.order.length > 0
                  ? formData.order.join(", ")
                  : "Select your orders"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {questionTypes.map((type, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition"
                  >
                    <input
                      type="checkbox"
                      name="order"
                      value={type}
                      checked={formData.order.includes(type)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => {
                          const isSelected = prev.order.includes(value);
                          return {
                            ...prev,
                            order: isSelected
                              ? prev.order.filter((item) => item !== value)
                              : [...prev.order, value],
                          };
                        });
                      }}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Exam Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              When are you giving exams?
            </label>
            <select
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select exam attempt</option>
              {examOptions.map((exam, index) => (
                <option key={index} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your full address"
              rows={3}
            ></textarea>
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pin Code
            </label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your pin code"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your city"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your state"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-[#0f0098] text-white font-semibold py-3 px-8 rounded-[10px] shadow-lg transition-all transform hover:scale-105"
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
}
