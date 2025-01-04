import { Department } from '../constants/departments';

export interface Employee {
  id: string;
  name: string;
  email: string;
  photo_url: string | null;
  department: Department;
  skills: Skill[];
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  name: string;
  isFavorite: boolean;
}

export interface Project {
  id: string;
  name: string;
  assignedEmployees: string[];
}