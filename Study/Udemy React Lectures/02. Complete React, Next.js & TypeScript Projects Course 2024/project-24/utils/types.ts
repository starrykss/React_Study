import { Prisma } from '@prisma/client';

export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

// product 테이블의 데이터를 포함한 타입 정의
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
