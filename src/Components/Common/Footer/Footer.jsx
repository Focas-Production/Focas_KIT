import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-10 px-6">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Images/logo.png" alt="Company Logo" className="h-12" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              FOCAS Edu is a next‑generation Chartered Accountancy learning
              ecosystem where expert faculty and AI‑assisted tutors work in
              tandem to transform effort into exam‑ready mastery. Our structured
              FOCAS Model delivers concise video lessons, a dedicated 1‑to‑10
              tutor ratio for real‑time monitoring and personalised feedback,
              weekly mock tests with video‑reviewed corrections, and
              high‑yield MCQ marathons.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-8">
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-700 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-700 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 hover:text-white text-gray-700" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Send className="w-5 h-5 hover:text-white text-gray-700" />
              </a>
            </div>
          </div>

          {/* Explore More Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              EXPLORE MORE
            </h3>
            <nav className="space-y-3">
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Educators
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                About US
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                FAQS
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">CONTACT US</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                Aalamaram Startup Incubator <br /> 6, Nava India Rd, behind
                Radisson Blu,
                <br /> Coimbatore,
                <br /> Tamil Nadu 641004.
              </p>

              <div className="space-y-1">
                <p>6383514285</p>
                <p>
                  <a
                    href="mailto:kvr@focasedu.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    kvr@focasedu.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-500">
            Copyright ©2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
