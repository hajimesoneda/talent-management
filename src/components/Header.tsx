import React from 'react';
import { useLocation } from 'react-router-dom';
import { AddEmployeeButton } from './Header/AddEmployeeButton';
import { BackButton } from './Header/BackButton';

export const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {isHomePage ? 'Employee Directory' : 'Employee Management'}
          </h1>
          <div className="flex items-center space-x-4">
            {isHomePage ? (
              <AddEmployeeButton />
            ) : (
              <BackButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};