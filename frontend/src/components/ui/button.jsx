// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
