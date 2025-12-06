// FocasLanding.jsx
import React, { useState, useEffect } from "react";
import { X, Play } from "lucide-react";
import SuccessStories from "./SuccessStories";
import Feedback from "./Feedback";
import Planner_Video from "../../../public/files/videos/Planer Foley Landscape.mp4"
import Planner_Pic from "../../../public/files/images/planner.jpeg"
import { loadRazorpayScript } from "../../utils/razorpay.js";
import axios from "axios";

export default function PlannerLanding() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
 const [formData, setFormData] = useState({
    name: "",
    title: "", // e.g. "FOCAS_PLANNER_KIT"
    attempt: "", // "JAN-26" | "MAY-26" | "SEC-26"
    email: "",
    phoneNumber: "",
    address: {
      fullAddress: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    },
    caLevel: "",
  });

  

  useEffect(() => {
    const handleScroll = () => {
      setShowWhatsapp(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


 const validate = () => {
    const requiredTop = ["name", "title", "attempt", "email", "phoneNumber", "caLevel"];
    for (const f of requiredTop) {
      const v = formData[f];
      if (!v || (typeof v === "string" && v.trim() === "")) {
        return `${f} is required`;
      }
    }

    // phone validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      return "Phone number must be 10 digits";
    }

    // address nested fields
    const { address } = formData;
    if (!address.fullAddress || !address.city || !address.state || !address.pincode) {
      return "Please fill full address fields (address, city, state, pincode)";
    }
    // basic pincode check (India)
    if (!/^\d{6}$/.test(address.pincode)) {
      return "Pincode must be 6 digits";
    }

    return null;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      return alert(validationError);
    }

    // load razorpay
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) return alert("Failed to load Razorpay SDK");

    try {
      setIsSubmitting(true);

      // Create order on backend. backend will determine amount from title.
      const createOrderRes = await axios.post(`${apiUrl}/api/payment/planner/create-order`, formData);

      if (!createOrderRes?.data?.success) {
        setIsSubmitting(false);
        console.error("Create order error:", createOrderRes?.data);
        return alert("Failed to create order");
      }

      const { order, keyId, userData } = createOrderRes.data;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "FOCAS / CA Guru",
        description: "FOCAS Planner Kit",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment (planner verify endpoint)
            const verifyRes = await axios.post(`${apiUrl}/api/payment/planner/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              formData: userData,
            });

            if (!verifyRes?.data?.success) {
              console.error("Verify failed:", verifyRes?.data);
              alert("Payment verification failed");
              return;
            }

            alert("Payment successful!");
            // clear form (reset nested address object too)
            setFormData({
              name: "",
              title: "",
              attempt: "",
              email: "",
              phoneNumber: "",
              address: {
                fullAddress: "",
                city: "",
                state: "",
                pincode: "",
                landmark: "",
              },
              caLevel: "",
            });

            // Redirect to success page with params (using submitted data)
            const redirectUrl = `https://focasedu.com/success?whatsapp_number=${encodeURIComponent(
              "91 " + userData.phoneNumber
            )}&level=${encodeURIComponent(userData.caLevel)}`;
            window.location.href = redirectUrl;
          } catch (err) {
            console.error("Verification handler error:", err);
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
      alert("Something went wrong while creating order");
    } finally {
      setIsSubmitting(false);
    }
  };


  const benefits = [
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Hand-On.webp",
      title: "Daily Time-Blocked Study Sheets",
      description:
        "Know exactly what to study every day — morning, afternoon, and night.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Learning.webp",
      title: "Subject-Wise Completion Tracker",
      description:
        "Track what’s done, what’s pending, and what needs revision.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Expert-Guidance.webp",
      title: "Lower-End & Higher-End Targets",
      description:
        "Even if the day goes bad, you still move forward. No zero-productivity days.",
    },
    {
      icon: "https://focasedu.com/wp-content/themes/edumodo/images/images/Icon-Creative.webp",
      title: "Self-Rating System",
      description:
        "Evaluate your performance daily and improve your weekly consistency.",
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
                Limited to 100 Pieces
              </h3>
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/fire.webp"
                alt="Fire"
                className="h-3 md:h-4"
              />
            </div>

           
             <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            
             <span>  
             <span className="font-large text-blue-500"> FOCAS Planner</span> – Designed by CAs, Built for CA Students</span> <br />
             
            </h1>
            

            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-8 md:mb-10">

              A scientifically structured, easy-to-follow CA study planner that helps you complete your syllabus on time, stay consistent, and track your performance — day after day.
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
                    <strong>4.9</strong> Ratings by CA Students ⭐
                  </p>
                </div>
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
                        src={Planner_Video}
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[80vh] rounded-lg object-contain bg-black"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <SuccessStories />

            {/* Stats */}
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <img
                src="https://focasedu.com/wp-content/themes/edumodo/images/images/Kit-Certificate-Icon.svg"
                alt="Certificate"
                className="h-5 md:h-6"
              />
              <h3 className="text-base md:text-lg font-semibold">
               70% Students Completed More Syllabus With This Planner
              </h3>
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Applicable for </h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                 Jan, May, Sep - 2026
                </p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">
                  Delivery
                </h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                 PAN India  7-10 days
                </p>
              </div>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-xs md:text-sm">Level</h4>
                <p className="font-semibold text-gray-800 text-sm md:text-base">
                  CA Intermediate
                </p>
              </div>
            </div>


            {/* Overview */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                Why Choose FOCAS Planner ?
              </h3>
              <h5 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Make this Your Last Attempt
              </h5>
            
              <p className="text-sm md:text-base text-gray-700 mb-4">
               Most CA students fail not because they don’t study —
but because they don’t know what to study, how much, and by when.

The FOCAS Planner gives you:

 <li className="flex items-center gap-2"> ✓ A crystal clear daily study plan</li>

 <li className="flex items-center gap-2">✓ A chapter-wise progress tracker</li>

<li className="flex items-center gap-2">✓ A realistic timetable built for CA pressure</li>
<li className="flex items-center gap-2">✓ A FOCAS-style execution system that keeps you accountable</li>



Whether you're starting fresh or restarting after a low attempt, the FOCAS Planner ensures you stay disciplined, focused, and ahead of your schedule.
              </p>


            </div>

           

            {/* Why Choose FOCAS */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                What’s Inside the FOCAS Planner ?
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
                          {/* Video Player */}
<section>

 {/*   <h1 className="w-full text-center text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 sm:mt-5">
       A FOCAS Plannner ASMR Experience
      </h1> */}
<h1 className="text-2xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-center pb-2 sm:pb-4">
  A FOCAS Planner ASMR Experience
</h1>


  <div
  className="relative rounded-lg md:rounded-xl overflow-hidden group cursor-pointer mb-10"
  onClick={() => setIsVideoPlaying(true)}
>
  <img
    src={Planner_Pic}
    alt="Thumbnail"
    className="w-full h-full object-cover block"
  />

  <button className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition">
    <div className="bg-black bg-opacity-70 text-white rounded-full p-3 md:p-4">
      <Play size={28} />
    </div>
  </button>
</div>
</section>


            {/* CTA Section */}
            <div className="bg-blue-600 text-white rounded-lg p-4 md:p-8 mb-4 md:mb-8">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 leading-snug">
             <span className="flex items-center justify-center"> Take Control of Your CA Preparation Today</span>
              </h2>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-white text-blue-600 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-gray-100 transition text-sm md:text-base"
              >
                Get My FOCAS Planner Now
              </button>
            </div>
          </div>

          {/* Right Sidebar - Fixed Box (Hidden on Mobile) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1 mb-4 text-sm">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-red-600 font-semibold">Best Seller</span>
              </div>

              <h3 className="text-lg font-bold mb-4">
                Limited to 100 Pieces
              </h3>
              <p className="text-sm mb-4">
                <strong>70%</strong>{" "}
                <span className="text-gray-500">Students Completed More Syllabus With This Planner⭐</span>
              </p>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 hover:bg-blue-800 transition"
              >
               Get My FOCAS Planner Now
              </button>

              <h4 className="font-bold mb-3">Benefits for Students</h4>

              <ul className="space-y-2 text-sm">
                <li>✓ Daily Structure</li>
                <li>✓ Faster Completion</li>
                <li>✓ Stronger Discipline</li>
                <li>✓ Better Exam Readiness</li>
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
          Get My FOCAS Planner Now
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
 {/* Popup Modal with form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mx-auto my-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Enter Details</h2>
              <button onClick={() => setIsPopupOpen(false)} className="text-gray-500">
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1">WhatsApp Number</label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    if (digits.length <= 10) {
                      setFormData((prev) => ({ ...prev, phoneNumber: digits }));
                    }
                  }}
                  maxLength={10}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* CA Level */}
              <div>
                <label className="block text-sm font-semibold mb-1">CA Level</label>
                <select name="caLevel" value={formData.caLevel} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                  <option value="">Select Level</option>
                  <option value="CA Foundation">CA Foundation</option>
                  <option value="CA Intermediate">CA Intermediate</option>
                  <option value="CA Final">CA Final</option>
                </select>
              </div>

              {/* Address - nested */}
              <div>
                <label className="block text-sm font-semibold mb-1">Full Address</label>
                <input
                  name="address.fullAddress"
                  value={formData.address.fullAddress}
                  onChange={handleInputChange}
                  placeholder="House no, street, area"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">City</label>
                  <input
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">State</label>
                  <input
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Pincode</label>
                  <input
                    name="address.pincode"
                    value={formData.address.pincode}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      if (digits.length <= 6) {
                        handleInputChange({ target: { name: "address.pincode", value: digits } });
                      }
                    }}
                    placeholder="6-digit pincode"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Landmark (optional)</label>
                  <input
                    name="address.landmark"
                    value={formData.address.landmark}
                    onChange={handleInputChange}
                    placeholder="Nearby landmark"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              {/* Attempt */}
              <div>
                <label className="block text-sm font-semibold mb-1">Attempt</label>
                <select name="attempt" value={formData.attempt} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                  <option value="">Select Attempt</option>
                  <option value="JAN-26">JAN-26</option>
                  <option value="MAY-26">MAY-26</option>
                  <option value="SEC-26">SEC-26</option>
                </select>
              </div>

              {/* Title / product */}
              <div>
                <label className="block text-sm font-semibold mb-1">Product / Price</label>
                <select name="title" value={formData.title} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2">
                  <option value="">Select Product</option>
                  <option value="FOCAS_PLANNER_KIT">FOCAS Planner Kit — ₹399</option>
                </select>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-md font-bold">
                {isSubmitting ? "Processing..." : "Pay ₹399"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>

    
  );
}
