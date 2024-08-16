// src/components/ui/label.jsx
import React from 'react';

export const Label = ({ htmlFor, children, className, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-gray-700 font-medium mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
