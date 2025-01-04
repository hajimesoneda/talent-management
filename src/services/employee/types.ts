import { Employee, Skill } from '../../types';

export interface EmployeeServiceInterface {
  getAllEmployees(): Promise<Employee[]>;
  addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<Employee>): Promise<void>;
  searchEmployeesBySkill(skillName: string): Promise<Employee[]>;
  getEmployeesByDepartment(department: string): Promise<Employee[]>;
}

export interface EmployeePhotoService {
  uploadPhoto(photoData: string): Promise<string>;
  updatePhoto(employeeId: string, photoData: string): Promise<string>;
}