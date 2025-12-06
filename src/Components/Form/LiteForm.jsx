
// export default LiteForm;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Dropdown options
const orderOptions = [
  "LAK - Both Groups Combo",
  "LAK - Group 1 Combo",
  "LAK - Group 2 Combo",
  "LAK - Advanced Accounting",
  "LAK - Corporate & Other Laws",
  "LAK - Taxation",
  "LAK - Audit",
  "LAK - Financial & Strategic Management",
];

export default function LiteForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sroNumber: "",
    email: "",
    phone: "",
    order: [],
    examDate: "",
  });

  const [loading, setLoading] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxNvXwlRYuuGwozzNlH6FpgjcBO-qY8oKp4AdNp2QD_O-fAfzI1XwgDe62soGqyF4jR/exec";

  // ✅ Handle input change for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle checkbox dropdown changes
  const handleCheckboxChange = (option) => {
    if (formData.order.includes(option)) {
      setFormData({
        ...formData,
        order: formData.order.filter((item) => item !== option),
      });
    } else {
      setFormData({ ...formData, order: [...formData.order, option] });
    }
  };

  // ✅ Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      order: formData.order.join(", "),
    };

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

    navigate("/liteform/success", { state: { from: "/liteform" } });


      // Reset form
      setFormData({
        name: "",
        sroNumber: "",
        email: "",
        phone: "",
        order: [],
        examDate: "",
      });
    } catch (error) {
      console.error("Error!", error.message);
    }

    setLoading(false);
  };

  // ✅ Dropdown toggle and click outside detection
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#0f0098] mb-6">
          Lite Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f0098] outline-none"
            />
          </div>

          {/* SRO Number */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              SRO Number
            </label>
            <input
              name="sroNumber"
              placeholder="Enter your SRO Number"
              value={formData.sroNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f0098] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f0098] outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Phone Number (WhatsApp)
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f0098] outline-none"
            />
          </div>

          {/* Checkbox Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-gray-700 mb-1 font-medium">
              What did you order?
            </label>
            <div
              onClick={() => setOpen(!open)}
              className="w-full border border-gray-300 p-3 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-[#0f0098] outline-none"
            >
              {formData.order.length > 0
                ? formData.order.join(", ")
                : "Select Your Order"}
            </div>

            {open && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {orderOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.order.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="accent-[#0f0098]"
                    />
                    <span className="text-gray-700 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Exam Date */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              When are you giving exams?
            </label>
            <select
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#0f0098] outline-none"
            >
              <option value="">Select Exam Period</option>
              <option value="Jan’26">Jan’26</option>
              <option value="May’26">May’26</option>
              <option value="Beyond">Beyond</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0f0098] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0d0086] transition-all shadow-md"
            >
              {loading ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

