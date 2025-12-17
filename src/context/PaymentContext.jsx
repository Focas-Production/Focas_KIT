import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentData, setPaymentData] = useState({
    phoneNumber: '',
    paymentOption: '',
    caLevel: '',
    amount:'',
    name: '',
    razorpayOrderId:'',
  });

  return (
    <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
      {children}
    </PaymentContext.Provider>
  );
}