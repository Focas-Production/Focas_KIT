// FocasLanding.jsx
import React, { useState, useEffect } from "react";
import { X, Play } from "lucide-react";
import SuccessStories from "./SuccessStories";
import Feedback from "./Feedback";
import AuditVideo from "../../../public/files/videos/Audit.mp4"
import AuditImage from "../../../public/files/images/Audit.jpg"
import { loadRazorpayScript } from "../../utils/razorpay.js";
import axios from "axios";

export default function AuditCourseLanding() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    sro: "",
    caLevel: "",
    previousAttempt: "",
    rtiLink: "",
    locationOfResidence: "",
    courseName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsapp(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ VALIDATION — Check required fields
  const requiredFields = [
    "name",
    "email",
    "phoneNumber",
    "sro",
    "caLevel",
    "previousAttempt",
    "rtiLink",
    "locationOfResidence",
    "courseName",
  ];

  const emptyFields = requiredFields.filter(
    (field) => !formData[field] || formData[field].trim() === ""
  );

  if (emptyFields.length > 0) {
    alert("Please fill all required fields");
    return;
  }

  // 2️⃣ LOAD RAZORPAY SCRIPT
  const res = await loadRazorpayScript();
  if (!res) return alert("Razorpay SDK failed to load");

  try {
    setIsSubmitting(true);

    // 3️⃣ CREATE ORDER
    const createOrderRes = await axios.post(
  `${apiUrl}/api/payment/audit-crash-course/create-order`,
      formData
    );

    if (!createOrderRes.data.success) {
      setIsSubmitting(false);
      return alert("Failed to create order");
    }

    const { order, keyId, userData } = createOrderRes.data;

    // 4️⃣ OPEN RAZORPAY PAYMENT WINDOW
    const options = {
      key: keyId,
      amount: order.amount,
      currency: "INR",
      name: "CA Guru.AI",
      description: "RTI Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          // 5️⃣ VERIFY PAYMENT
          await axios.post(
            `${apiUrl}/api/payment/audit-crash-course/verify-payment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              formData: userData,
            }
          );

          alert("Payment Successful!");
          // 6️⃣ CLEAR FORM
          setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            sro: "",
            caLevel: "",
            previousAttempt: "",
            rtiLink: "",
            locationOfResidence: "",
            courseName: "",
          });
               // ---- REDIRECT ----
      const redirectUrl = `https://focasedu.com/success?whatsapp_number=${encodeURIComponent(
        "91 " + formData.phoneNumber
      )}&level=${encodeURIComponent(formData.caLevel)}`;

      window.location.href = redirectUrl; 
           
        } catch (error) {
          console.error(error);
          alert("Error verifying payment");
        }
      },

      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phoneNumber,
      },

      theme: { color: "#4f46e5" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }

  setIsSubmitting(false);
};



  const benefits = [
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Hand-On.webp",
      title: " Expert CA Faculty Classes (Recorded)",
      description:
        "Full concept coverage of the entire Audit book designed to give you clarity and confidence.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Learning.webp",
      title: "90 Hours of Live Tutor Sessions",
      description:
        `Daily accountability, execution, and support,
        1 Tutor : 10 Students → Individualised attention.`,
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Expert-Guidance.webp",
      title: "Complete the Entire Subject",
      description:
        "Finish Audit from start to end with a planned, structured, daily schedule.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Creative.webp",
      title: "Full Test Included",
      description:
        "A final test to check your preparedness for Jan 2026.",
    },

  ];

  return (
    <div className="bg-white">
      {/* Header Logo */}
      <div className="flex justify-center pt-6 pb-4 px-4">
        <img
          src="https://focasedu.com/wp-content/uploads/2024/02/Focus-logo-tagline-01-1-1.png"
          alt="Logo"
          className="h-16 md:h-20 max-w-full"
        />
      </div>

      {/* Hero Section */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 bg-gray-100 rounded-lg mx-2 md:mx-4 lg:mx-8 mb-20 lg:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Limited Seats Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 md:px-6 py-3 mb-6 md:mb-8">
              <h3 className="text-xs md:text-sm font-semibold text-blue-800">
                Limited Seats : 30 Students Only
              </h3>
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/fire.webp"
                alt="Fire"
                className="h-3 md:h-4"
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            
            {/*  <span>Get Your Certified Copies <br /> 
             <span className="font-large text-blue-500">Personally Reviewed</span> by a CA </span> <br /> */}
             FOCAS <span  className="font-large text-blue-500">Audit</span> for Jan 2026 – Study the Entire Book With Expert CA Guidance
             
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-8 md:mb-10">
              Understand every concept, fix your preparation gaps, and complete Audit using a structured 90-hour tutor-led system designed to help you overcome procrastination and study without stress.
            </p>

            {/* Video Section */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-6 mb-8 md:mb-10 flex-wrap">
                <div className="flex gap-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/Mari%20Muthu.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/Mohanapriyadharsini.jpg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-300 flex-shrink-0">
                    <img
                      src="https://focasedu.com/wp-content/themes/edumodo/images/images/sri%20devi.jpeg"
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <img
                    src="https://focasedu.com/wp-content/themes/edumodo/images/images/five-stars.svg"
                    alt="Stars"
                    className="h-5 md:h-6 mb-1 md:mb-2"
                  />
                  <p className="text-xs md:text-sm">
                    <strong>4.9</strong> Ratings by Students ⭐
                  </p>
                </div>
              </div>

              {/* Video Player */}
<div
  className="relative rounded-lg md:rounded-xl overflow-hidden group cursor-pointer"
  onClick={() => setIsVideoPlaying(true)}
>
  <img
    src={AuditImage}
    alt="Thumbnail"
    className="w-full h-full object-cover block"
  />

  <button className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition">
    <div className="bg-black bg-opacity-70 text-white rounded-full p-3 md:p-4">
      <Play size={28} />
    </div>
  </button>
</div>


              {isVideoPlaying && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3 sm:p-4">
                  <div className="bg-white rounded-lg max-w-4xl w-full">
                    <div className="flex justify-end p-3 md:p-4">
                      <button
                        onClick={() => setIsVideoPlaying(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="px-3 pb-4 md:px-4 md:pb-6">
                      <video
                        src={AuditVideo}
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[80vh] rounded-lg object-contain bg-black"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/Kit-Certificate-Icon.svg"
                alt="Certificate"
                className="h-5 md:h-6"
              />
              <h3 className="text-base md:text-lg font-semibold">
               70% Students Passed
              </h3>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Mode</h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  Online Live
                </p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">
                 Tutor Sessions - Class Strength
                </h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  &lt;  10 Students per Tutor
                </p>
               
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Language</h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                 Tamil +  English
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
               FOCAS Audit for Jan 2026 
              </h3>
              <h5 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Make this Your Last Attempt
              </h5>
           









This crash course solves all of that through an Expert CA Faculty explaining the entire book + 90 hours of live tutor support where you actually complete the subject under guidance.



              <p className="text-sm md:text-base text-gray-700 mb-4">
                Most CA Inter students struggle not because Audit is tough, but because:
 <li className="flex items-center gap-2"> ✓ They don’t know how to start</li>

 <li className="flex items-center gap-2">✓ They don’t have guidance while studying</li>

<li className="flex items-center gap-2">✓ They procrastinate due to low confidence</li>

<li className="flex items-center gap-2">✓ They don’t finish the syllabus on time</li>
<br />

This crash course solves all of that through an Expert CA Faculty explaining the entire book + 90 hours of live tutor support where you actually complete the subject under guidance.
 <li className="flex items-center gap-2">✓ You don’t study alone.</li>

<li className="flex items-center gap-2">✓ You study with a system.</li>

              </p>
             

            </div>

           

            {/* Why Choose FOCAS */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              What’s Included in FOCAS Audit
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx}>
                    <img
                      src={benefit.icon}
                      alt={benefit.title}
                      className="h-10 md:h-12 mb-3 md:mb-4"
                    />
                    <h4 className="text-base md:text-lg font-bold mb-2 text-gray-800">
                      {benefit.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Carousel */}
            <Feedback />

            {/* Success Stories (Video Cards) */}
            <SuccessStories />

            {/* CTA Section */}
            <div className="bg-blue-600 text-white rounded-lg p-4 md:p-8 mb-4 md:mb-8">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 leading-snug">
             <span className="flex items-center justify-center"> Overcome procrastination and complete Audit without stress.</span>
              </h2>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-white text-blue-600 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-100 transition text-sm md:text-base"
              >
                Enroll for FOCAS Audit Now
              </button>
            </div>
          </div>

          {/* Right Sidebar - Fixed Box (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1 mb-4 text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-red-600 font-semibold">Online + Live</span>
              </div>

              <h3 className="text-lg font-bold mb-4">
                Limited Spots : 30 Students ONLY
              </h3>
              <p className="text-sm mb-4">
                <strong>70%</strong>{" "}
                <span className="text-gray-500">Students Passed ⭐</span>
              </p>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-800 transition"
              >
          Enroll for FOCAS Audit Now
              </button>

              <h4 className="font-bold mb-3">Why This Crash Course Works</h4>
              <ul className="space-y-2 text-sm">
                <li>✓ Study the Full Audit Book, Not Just Important Topics</li>
                <li>✓ 90 Hours of Guided Execution</li>
                <li>✓ Stress-Free Structure</li>
                <li>✓ Perfect for Jan 2026 Students</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Enroll Now - Limited Spots
        </button>
      </div>

      {/* WhatsApp Button */}
      {showWhatsapp && (
        <a
          href="https://wa.me/+916383514285"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 bg-green-500 hover:bg-green-600 rounded-full p-3 md:p-4 shadow-lg transition-transform hover:scale-110 z-40"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </a>
      )}

      {/* Popup Modal */}
     {isPopupOpen && (
  <div
    className="fixed inset-0 bg-white/10 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto animate-fadeIn"
  >
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mx-auto my-12 animate-scaleIn">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Enter Details</h2>
        <button
          onClick={() => setIsPopupOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={26} />
        </button>
      </div>

      {/* FORM */}
      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-bold mb-2.5">WhatsApp Number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter 10-digit WhatsApp number"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData((prev) => ({ ...prev, phoneNumber: value }));
              }
            }}
            maxLength={10}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* SRO */}
        <div>
          <label className="block text-sm font-bold mb-2.5">SRO Number</label>
          <input
            type="text"
            name="sro"
            placeholder="Enter SRO number"
            value={formData.sro}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* CA Level */}
        <div>
          <label className="block text-sm font-bold mb-2.5">CA Level</label>
          <select
            name="caLevel"
            value={formData.caLevel}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          >
            <option value="">Select Level</option>
            <option value="CA Foundation">CA Foundation</option>
            <option value="CA Intermediate">CA Intermediate</option>
            <option value="CA Final">CA Final</option>
          </select>
        </div>

        {/* Previous Attempt */}
        <div>
          <label className="block text-sm font-bold mb-3">Previous Attempt?</label>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="previousAttempt"
                value="Yes"
                checked={formData.previousAttempt === "Yes"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="previousAttempt"
                value="No"
                checked={formData.previousAttempt === "No"}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>

        {/* RTI Link */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Certified Copy (RTI) Link</label>
          <input
            type="text"
            name="rtiLink"
            placeholder="Paste Google Drive link"
            value={formData.rtiLink}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold mb-2.5">Location of Residence</label>
          <input
            type="text"
            name="locationOfResidence"
            placeholder="Enter your city"
            value={formData.locationOfResidence}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="block text-sm font-bold mb-3">Course Name</label>
          <select
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 rounded-md px-4 py-2.5"
          >
            <option value="">Select Course</option>
            <option value="AUDIT_CRASH_COURSE">AUDIT_CRASH_COURSE- RS3500</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

    </div>
  </div>
)}
<style>
{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.25s ease-out;
  }

  .animate-scaleIn {
    animation: scaleIn 0.25s ease-out;
  }
`}
</style>


    </div>
  );
}
