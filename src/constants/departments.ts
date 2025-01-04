// Department type and constants
export const DEPARTMENTS = [
  'Engineering',
  'Product Design',
  'Data Science',
  'Product Management',
  'Marketing'
] as const;

export type Department = typeof DEPARTMENTS[number];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map(dept => ({
  value: dept,
  label: dept
}));