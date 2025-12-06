import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // set true for console logs
};

export const initFacebookPixel = () => {
  ReactPixel.init("525895529970374", undefined, options);
  ReactPixel.pageView(); // Track initial pageview
};

export const trackEvent = (eventName, data) => {
  ReactPixel.track(eventName, data);
};
