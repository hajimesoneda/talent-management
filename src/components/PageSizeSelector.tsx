import React from 'react';
import Select from 'react-select';

interface PageSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 per page' },
  { value: 30, label: '30 per page' },
  { value: -1, label: 'Show all' }
];

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Items per page
      </label>
      <Select
        options={PAGE_SIZE_OPTIONS}
        value={PAGE_SIZE_OPTIONS.find(option => option.value === value)}
        onChange={(option) => onChange(option?.value ?? 10)}
        className="w-full"
      />
    </div>
  );
};