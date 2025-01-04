import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../types';
import { useEmployeeStore } from '../../store/employeeStore';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SkillsSection } from './SkillsSection';
import { Department } from '../../constants/departments';

interface EmployeeFormProps {
  employee?: Employee;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const navigate = useNavigate();
  const { addEmployee, updateEmployee } = useEmployeeStore();
  
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    department: employee?.department || 'Engineering' as Department,
    skills: employee?.skills || [],
    photo_url: employee?.photo_url || null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await addEmployee(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save employee:', error);
    }
  };

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: typeof formData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <PersonalInfoSection 
          name={formData.name}
          email={formData.email}
          department={formData.department}
          photo_url={formData.photo_url}
          onUpdate={updateField}
        />
        
        <SkillsSection 
          skills={formData.skills}
          onUpdate={(skills) => updateField('skills', skills)}
        />
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {employee ? 'Update Employee' : 'Create Employee'}
          </button>
        </div>
      </div>
    </form>
  );
};