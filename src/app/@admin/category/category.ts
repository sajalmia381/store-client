import { Product } from '../product/product';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  products: Product[];
}
