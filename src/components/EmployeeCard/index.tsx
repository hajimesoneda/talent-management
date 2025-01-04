import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../../types';
import { ProfileSection } from './ProfileSection';
import { SkillsSection } from './SkillsSection';
import { useEmployeeStore } from '../../store/employeeStore';

interface EmployeeCardProps {
  employee: Employee;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const navigate = useNavigate();
  const { deleteEmployee } = useEmployeeStore();

  const handleEdit = () => {
    navigate(`/edit/${employee.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employee.id);
      } catch (error) {
        console.error('Failed to delete employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <ProfileSection employee={employee} />
      <SkillsSection skills={employee.skills} />
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};