import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ fullWidth = true, className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`${fullWidth ? 'w-full' : 'flex-1'} bg-transparent border-b border-gray-300 focus:border-blue-500 focus:ring-0 px-0 ${className}`}
    />
  );
};