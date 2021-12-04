import { User } from '../user/user';

export interface Product {
  _id: string;
  title: string;
  slug: string;
  price: string;
  category: any;
  description?: string;
  image?: string;
  createBy?: any;
}
