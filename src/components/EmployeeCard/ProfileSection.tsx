import React from 'react';
import { User, Mail, Building2 } from 'lucide-react';
import { Employee } from '../../types';

interface ProfileSectionProps {
  employee: Employee;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ employee }) => (
  <div className="flex items-start space-x-4">
    {employee.photo_url ? (
      <img
        src={employee.photo_url}
        alt={employee.name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
    ) : (
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
        <User className="w-8 h-8 text-gray-400" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold truncate">{employee.name}</h3>
      <div className="flex items-center text-gray-600 text-sm mt-1">
        <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
        <a
          href={`mailto:${employee.email}`}
          className="hover:text-blue-600 truncate"
          title={employee.email}
        >
          {employee.email}
        </a>
      </div>
      <div className="flex items-center text-gray-600 text-sm mt-1">
        <Building2 className="w-4 h-4 mr-1 flex-shrink-0" />
        <span className="truncate">{employee.department}</span>
      </div>
    </div>
  </div>
);