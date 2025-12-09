import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentData, setPaymentData] = useState({
    phoneNumber: '',
    paymentOption: '',
    caLevel: '',
    name: ''
  });

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
}