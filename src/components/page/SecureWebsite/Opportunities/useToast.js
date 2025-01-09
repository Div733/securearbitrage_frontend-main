import React, { createContext, useState, useContext } from 'react';

// Create the context
const ToastContext = createContext();

// Create a provider component
export const ToastProvider = ({ children }) => {
  const [toastShown, setToastShown] = useState(false); // Keep track if toast is shown

  return (
    <ToastContext.Provider value={{ toastShown, setToastShown }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the Toast Context
export const useToast = () => useContext(ToastContext);
