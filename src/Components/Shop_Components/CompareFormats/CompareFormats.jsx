import React from "react";
import { FileText, BookOpen, FileDigit } from "lucide-react";

const formats = [
  {
    title: "Secure PDF",
    icon: <FileText className="text-red-500 w-6 h-6" />,
    label: "MOST POPULAR",
    labelColor: "bg-red-500",
    textColor: "text-red-600",
    bullets: [
      "E-Book version (Non Printable)",
      "Are available instantly",
      "Any new material is automatically added in the PDF even after your purchase",
      "Can read any subject any time. On 2 devices (Once registered, cannot change devices)",
    ],
    linkText: "BUY SECURE PDF NOW",
  },
  {
    title: "Paper Books",
    icon: <BookOpen className="text-sky-500 w-6 h-6" />,
    bullets: [
      "Paper Back Books, Delivered to your doorstep",
      "Take 10–12 working days to be delivered",
      "Any new material is given as a separate PDF file",
      "Paper Back – Good for those who can't have long screen times.",
    ],
    textColor: "text-sky-600",
    linkText: "BUY PAPER BOOKS NOW",
  },
  {
    title: "Bundle",
    icon: <FileDigit className="text-purple-500 w-6 h-6" />,
    label: "MOST POPULAR",
    labelColor: "bg-purple-500",
    textColor: "text-purple-600",
    subtitle: "(Secure PDF + Paper Book)",
    bullets: [
      "Get both– The E– Book version and the Paper Back Books for 1/10 the total Cost",
      "PDF are instantly available",
      "The PDF will get automatically updated",
      "Read the books when at home and read them online when travelling as per your convenience",
    ],
    linkText: "BUY PDF + BOOK BUNDLE NOW",
  },
];

export default function CompareFormats() {
  return (
    <div className="compare-formats bg-white shadow-lg rounded-[32px] p-6 md:p-12 max-w-[90%] md:max-w-[76%] lg:max-w-6xl 2xl:max-w-7xl mx-auto my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Compare Material Formats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formats.map((format, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-6 text-sm flex flex-col justify-between shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {format.icon}
                <h3 className={`text-lg font-semibold ${format.textColor}`}>
                  {format.title}
                </h3>
                {format.label && (
                  <span
                    className={`text-white text-[10px] font-bold px-2 py-[2px] rounded-sm ${format.labelColor}`}
                  >
                    {format.label}
                  </span>
                )}
              </div>
              {format.subtitle && (
                <p className="text-xs text-gray-500 ml-8 mb-2">
                  {format.subtitle}
                </p>
              )}
              <hr className="my-2" />
              <ul className="list-none space-y-2">
                {format.bullets.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className={`mt-1 text-lg ${
                        format.textColor || "text-sky-600"
                      }`}
                    >
                      ✔
                    </span>
                    <span className="text-gray-800">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="text-black font-medium underline hover:text-blue-600"
              >
                {format.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
