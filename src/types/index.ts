export interface IStudent {
  id: number;
  name: string;
  email: string;
  password: string;
  departmentId: number;
}

export interface ICourses {
  id: number;
  name: string;
  content: string;
  departmentId: number;
}

export interface IDepartment {
  id: number;
  name: string;
}
