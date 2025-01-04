import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export const AddEmployeeButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/new')}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <UserPlus className="h-5 w-5 mr-2" />
      Add Employee
    </button>
  );
};