export interface User {
  _id: string;
  name?: string;
  email: string;
  password: string;
  number?: number;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}
