import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LiteSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent direct access
  useEffect(() => {
    if (!location.state?.from) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full relative z-10"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="text-gray-800 mb-3 leading-relaxed text-center"
        >
          <h2 className="mb-2 font-semibold text-lg">
            ✅ Lite Order Placed Successfully
          </h2>
          <p className="mb-2">Let's Make it Your Last Attempt</p>
          <p>Digital Access will be given in 24 hrs</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
