import React from 'react';
import { Building2, User, Mail } from 'lucide-react';
import Select from 'react-select';
import { FormField } from './FormField';
import { TextInput } from './TextInput';
import { FormSection } from './FormSection';
import { PhotoUpload } from './PhotoUpload';
import { Department } from '../../constants/departments';

interface PersonalInfoSectionProps {
  name: string;
  email: string;
  department: Department;
  photo_url: string | null;
  departmentOptions: Array<{ value: Department; label: string }>;
  onUpdate: <K extends 'name' | 'email' | 'department' | 'photo_url'>(
    field: K,
    value: string | null
  ) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  name,
  email,
  department,
  photo_url,
  departmentOptions,
  onUpdate
}) => {
  return (
    <FormSection className="flex items-start space-x-4">
      <PhotoUpload 
        photoUrl={photo_url} 
        onPhotoChange={(url) => onUpdate('photo_url', url)} 
      />
      <div className="flex-1 space-y-4">
        <FormField icon={User}>
          <TextInput
            type="text"
            value={name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Employee Name"
            className="text-lg font-semibold"
            required
          />
        </FormField>

        <FormField icon={Mail}>
          <TextInput
            type="email"
            value={email}
            onChange={(e) => onUpdate('email', e.target.value)}
            placeholder="Email Address"
            required
          />
        </FormField>

        <FormField icon={Building2}>
          <div className="flex-1 min-w-[240px]">
            <Select
              options={departmentOptions}
              value={departmentOptions.find(d => d.value === department)}
              onChange={(option) => onUpdate('department', option?.value || 'Engineering')}
              placeholder="Select Department"
              className="w-full"
              classNames={{
                control: (state) => 
                  `!min-h-[42px] !bg-white ${
                    state.isFocused ? '!border-blue-500 !shadow-none' : '!border-gray-300'
                  }`,
                menu: () => "!bg-white",
                option: (state) => 
                  `!py-2 ${
                    state.isSelected 
                      ? '!bg-blue-500 !text-white' 
                      : state.isFocused 
                        ? '!bg-blue-50' 
                        : ''
                  }`
              }}
              required
            />
          </div>
        </FormField>
      </div>
    </FormSection>
  );
};