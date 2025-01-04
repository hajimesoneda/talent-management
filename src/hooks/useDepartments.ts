import { useMemo } from 'react';
import { getDepartmentOptions } from '../constants/departments';

export const useDepartments = () => {
  return useMemo(() => getDepartmentOptions(), []);
};