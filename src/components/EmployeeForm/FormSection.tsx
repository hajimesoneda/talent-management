import React from 'react';

interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h4 className="font-medium text-sm text-gray-700">{title}</h4>
      )}
      {children}
    </div>
  );
};