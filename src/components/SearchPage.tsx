import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Filter, Users } from 'lucide-react';
import { useEmployeeStore } from '../store/employeeStore';
import { EmployeeCard } from './EmployeeCard';
import { Pagination } from './Pagination';
import { PageSizeSelector } from './PageSizeSelector';
import { DEPARTMENT_OPTIONS } from '../constants/departments';
import { useSkills } from '../hooks/useSkills';

export const SearchPage: React.FC = () => {
  const { employees, totalCount, fetchEmployees, isLoading, error } = useEmployeeStore();
  const { skills } = useSkills();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [skillFilter, setSkillFilter] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees(currentPage, pageSize, {
      department: selectedDepartment as any,
      skill: skillFilter
    });
  }, [currentPage, pageSize, selectedDepartment, skillFilter, fetchEmployees]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const skillOptions = skills.map(skill => ({
    value: skill.name,
    label: skill.name,
    category: skill.category
  }));

  const groupedSkillOptions = skillOptions.reduce((acc, option) => {
    const group = acc.find(g => g.label === option.category);
    if (group) {
      group.options.push({ value: option.value, label: option.label });
    } else {
      acc.push({
        label: option.category,
        options: [{ value: option.value, label: option.label }]
      });
    }
    return acc;
  }, [] as { label: string; options: { value: string; label: string }[] }[]);

  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {(skillFilter || selectedDepartment) && (
            <button
              onClick={() => {
                setSkillFilter('');
                setSelectedDepartment(null);
                handleFilterChange();
              }}
              className="ml-auto text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by skill
            </label>
            <Select
              placeholder="Select skill..."
              options={groupedSkillOptions}
              value={skillFilter ? { value: skillFilter, label: skillFilter } : null}
              onChange={(option) => {
                setSkillFilter(option?.value || '');
                handleFilterChange();
              }}
              isClearable
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by department
            </label>
            <Select
              placeholder="Select department..."
              options={DEPARTMENT_OPTIONS}
              value={selectedDepartment ? { value: selectedDepartment, label: selectedDepartment } : null}
              onChange={(option) => {
                setSelectedDepartment(option?.value || null);
                handleFilterChange();
              }}
              isClearable
              className="w-full"
            />
          </div>

          <PageSizeSelector value={pageSize} onChange={handlePageSizeChange} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Employees</h2>
          </div>
          <span className="text-sm text-gray-500">
            Showing {employees.length} of {totalCount} employees
          </span>
        </div>

        {employees.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <EmployeeCard 
                  key={employee.id} 
                  employee={employee}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No employees match the current filters</p>
            <button
              onClick={() => {
                setSkillFilter('');
                setSelectedDepartment(null);
                handleFilterChange();
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};