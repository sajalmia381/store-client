import { User } from "../user/user"

export type CartProduct = {
  _id: string,
  title: string,
  slug: string,
  price: number
}

export type ProductSpecification = {
  product: CartProduct,
  quantity: number
}

export type Cart = {
  _id: string,
  user: Pick<User, "_id" | "name" | "role" | "email">;
  products: ProductSpecification[];
  updatedAt: Date;
  createdAt: Date;
}

export type CartFormPayload = {
  userId?: string,
  productId: string,
  quantity: number
}