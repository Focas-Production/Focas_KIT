// src/hooks/useGTMPageView.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useGTMPageView() {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: location.pathname,
    });
  }, [location]);
}
