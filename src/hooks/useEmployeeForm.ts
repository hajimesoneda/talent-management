import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types';
import { useEmployeeStore } from '../store/employeeStore';

interface FormData {
  name: string;
  email: string;
  department: string;
  skills: { name: string; isFavorite: boolean }[];
  photo_url: string | null;
}

export const useEmployeeForm = (employee?: Employee) => {
  const navigate = useNavigate();
  const { addEmployee, updateEmployee } = useEmployeeStore();
  
  const [formData, setFormData] = useState<FormData>({
    name: employee?.name || '',
    email: employee?.email || '',
    department: employee?.department || '',
    skills: employee?.skills || [],
    photo_url: employee?.photo_url || null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await addEmployee(formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateField,
    isSubmitting,
    error,
    handleSubmit
  };
};