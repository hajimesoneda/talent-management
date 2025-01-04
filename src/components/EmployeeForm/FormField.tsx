import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  icon: LucideIcon;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ icon: Icon, children }) => {
  return (
    <div className="flex items-center text-gray-600 text-sm">
      <Icon className="w-4 h-4 mr-1 flex-shrink-0" />
      {children}
    </div>
  );
};