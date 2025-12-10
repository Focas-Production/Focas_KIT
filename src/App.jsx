import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { initFacebookPixel } from "./lib/facebookPixel";
import { PaymentProvider } from "./context/PaymentContext";
import { Toaster } from 'react-hot-toast';

initFacebookPixel(); // initialize once globally

// Combined tracker for GTM + FB Pixel
const PageViewTracker = ({ children }) => {
  const location = useLocation();

  // GTM pageview
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: location.pathname,
    });

    // FB Pixel pageview
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return children;
};

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <PaymentProvider>
      <CartProvider>
        <PageViewTracker>
          <AppRoutes />
        </PageViewTracker>
      </CartProvider>
      </PaymentProvider>
    </Router>
  );
};

export default App;
