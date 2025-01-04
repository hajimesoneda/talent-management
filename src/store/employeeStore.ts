import { create } from 'zustand';
import { Employee } from '../types';
import { supabase } from '../lib/supabase';
import { Department } from '../constants/departments';

interface EmployeeCache {
  data: Employee[];
  totalCount: number;
  timestamp: number;
}

interface EmployeeState {
  employees: Employee[];
  totalCount: number;
  cache: Record<string, EmployeeCache>;
  isLoading: boolean;
  error: string | null;
  fetchEmployees: (page: number, pageSize: number, filters?: {
    department?: Department;
    skill?: string;
  }) => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateEmployee: (id: string, updates: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (page: number, pageSize: number, filters?: { department?: Department; skill?: string }) => {
  return `${page}-${pageSize}-${filters?.department || ''}-${filters?.skill || ''}`;
};

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  totalCount: 0,
  cache: {},
  isLoading: false,
  error: null,

  fetchEmployees: async (page: number, pageSize: number, filters) => {
    const cacheKey = getCacheKey(page, pageSize, filters);
    const cache = get().cache[cacheKey];
    const now = Date.now();
    
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      set({ employees: cache.data, totalCount: cache.totalCount, isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      let query = supabase
        .from('employees')
        .select('*', { count: 'exact' });

      if (filters?.department) {
        query = query.eq('department', filters.department);
      }

      if (filters?.skill) {
        query = query.contains('skills', [{ name: filters.skill }]);
      }

      // Get total count
      const { count } = await query;

      // Get paginated data
      const start = (page - 1) * pageSize;
      const end = pageSize === -1 ? null : start + pageSize - 1;

      let dataQuery = query
        .order('name')
        .range(start, end || count! - 1);

      const { data, error } = await dataQuery;

      if (error) throw error;

      const validEmployees = data?.map(emp => ({
        ...emp,
        department: emp.department as Department
      })) || [];

      // Update cache
      set(state => ({
        employees: validEmployees,
        totalCount: count || 0,
        cache: {
          ...state.cache,
          [cacheKey]: {
            data: validEmployees,
            totalCount: count || 0,
            timestamp: now
          }
        },
        isLoading: false
      }));
    } catch (error) {
      console.error('Supabase request failed', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch employees', 
        isLoading: false 
      });
    }
  },

  addEmployee: async (employee) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([employee])
        .select()
        .single();

      if (error) throw error;

      // Clear cache to force refresh
      get().clearCache();

      set(state => ({
        employees: [...state.employees, data],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add employee', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateEmployee: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Clear cache to force refresh
      get().clearCache();

      set(state => ({
        employees: state.employees.map(emp =>
          emp.id === id ? { ...emp, ...updates } : emp
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update employee', 
        isLoading: false 
      });
      throw error;
    }
  },

  deleteEmployee: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Clear cache to force refresh
      get().clearCache();

      set(state => ({
        employees: state.employees.filter(emp => emp.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete employee', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearCache: () => {
    set({ cache: {} });
  }
}));