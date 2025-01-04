import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../types';
import { useEmployeeStore } from '../store/employeeStore';
import { DEPARTMENT_OPTIONS } from '../constants/departments';
import { useSkills } from '../hooks/useSkills';
import { EmployeeFormContent } from './EmployeeForm/EmployeeFormContent';

interface EmployeeFormProps {
  employee?: Employee;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const navigate = useNavigate();
  const { addEmployee, updateEmployee, fetchEmployees } = useEmployeeStore();
  const { skills, isLoading: isLoadingSkills } = useSkills();

  const handleSubmit = async (formData: Omit<Employee, 'id'>) => {
    try {
      if (employee) {
        await updateEmployee(employee.id, formData);
      } else {
        await addEmployee(formData);
      }
      await fetchEmployees(1, 10); // Refresh the first page
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  if (isLoadingSkills) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <EmployeeFormContent
      employee={employee}
      availableSkills={skills}
      departmentOptions={DEPARTMENT_OPTIONS}
      onSubmit={handleSubmit}
    />
  );
};