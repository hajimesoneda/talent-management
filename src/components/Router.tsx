import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { EditEmployee } from '../pages/EditEmployee';
import { EmployeeForm } from './EmployeeForm';

interface RouterProps {
  children: React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/new" element={<EmployeeForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};