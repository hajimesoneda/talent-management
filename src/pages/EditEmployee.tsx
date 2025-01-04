import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { EmployeeForm } from '../components/EmployeeForm';
import { supabase } from '../lib/supabase';
import type { Employee } from '../types';

export const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setError('Invalid employee ID');
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) {
          throw new Error('Employee not found');
        }
        
        setEmployee(data as Employee);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch employee details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 rounded-lg">
        <p className="text-red-700">{error || 'Employee not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to List
        </button>
      </div>
    );
  }

  return <EmployeeForm employee={employee} />;
};