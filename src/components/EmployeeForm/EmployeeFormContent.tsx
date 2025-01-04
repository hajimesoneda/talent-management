import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Employee } from '../../types';
import { Department } from '../../constants/departments';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SkillsSection } from './SkillsSection';
import { validateEmail } from '../../utils/validation';

interface EmployeeFormContentProps {
  employee?: Employee;
  availableSkills: Array<{ id: string; name: string; category: string }>;
  departmentOptions: Array<{ value: Department; label: string }>;
  onSubmit: (formData: Omit<Employee, 'id'>) => Promise<void>;
}

export const EmployeeFormContent: React.FC<EmployeeFormContentProps> = ({
  employee,
  availableSkills,
  departmentOptions,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    department: employee?.department || 'Engineering' as Department,
    skills: employee?.skills || [],
    photo_url: employee?.photo_url || null
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('duplicate key') || err.message.includes('employees_email_key')) {
          setError('This email address is already in use. Please use a different email.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) => {
    setError(null);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <PersonalInfoSection 
          name={formData.name}
          email={formData.email}
          department={formData.department}
          photo_url={formData.photo_url}
          departmentOptions={departmentOptions}
          onUpdate={updateField}
        />
        
        <SkillsSection 
          skills={formData.skills}
          availableSkills={availableSkills}
          onUpdate={(skills) => updateField('skills', skills)}
        />
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? 'Saving...' 
              : employee ? 'Update Employee' : 'Create Employee'
            }
          </button>
        </div>
      </div>
    </form>
  );
};