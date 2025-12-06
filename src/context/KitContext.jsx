import React, { createContext, useContext, useState } from "react";

// Create the context
const KitContext = createContext();

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useKit = () => {
  const context = useContext(KitContext);
  if (!context) {
    throw new Error("useKit must be used within a KitProvider");
  }
  return context;
};

// Context provider component
export const KitProvider = ({ children }) => {
  const [selectedKit, setSelectedKit] = useState("Pro Kit");

  // Define price multipliers or specific prices for each kit type
  const kitPricing = {
    "Lite Kit": {
      multiplier: 1,
      priceKey: "Lit_price", // matches your products.js structure
    },
    "Essentials Kit": {
      multiplier: 1,
      priceKey: "Essential_price",
    },
    "Pro Kit": {
      multiplier: 1,
      priceKey: "Pro_price",
    },
  };

  // Function to get the current price for a product based on selected kit
  const getProductPrice = (product) => {
    const currentKit = kitPricing[selectedKit];
    if (!currentKit) return product.Lit_price || 0;

    // Return the price based on the selected kit type
    switch (selectedKit) {
      case "Lite Kit":
        return product.Lit_price || product.Lite_price || 0;
      case "Essentials Kit":
        return product.Essential_price || 0;
      case "Pro Kit":
        return product.Pro_price || 0;
      default:
        return product.Lit_price || product.Lite_price || 0;
    }
  };

  // Function to get current kit pricing info
  const getCurrentKitInfo = () => {
    return kitPricing[selectedKit];
  };

  const value = {
    selectedKit,
    setSelectedKit,
    getProductPrice,
    getCurrentKitInfo,
    kitPricing,
  };

  return <KitContext.Provider value={value}>{children}</KitContext.Provider>;
};

export default KitContext;
