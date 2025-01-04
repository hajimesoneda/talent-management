import React from 'react';
import { Mail } from 'lucide-react';
import { FormField } from './FormField';
import { TextInput } from './TextInput';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({ 
  value, 
  onChange, 
  required = true 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <FormField icon={Mail}>
      <TextInput
        type="email"
        value={value}
        onChange={handleChange}
        placeholder="Email Address"
        required={required}
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
        title="Please enter a valid email address"
        className={`${!value || validateEmail(value) ? '' : 'border-red-500'}`}
      />
      {value && !validateEmail(value) && (
        <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
      )}
    </FormField>
  );
};