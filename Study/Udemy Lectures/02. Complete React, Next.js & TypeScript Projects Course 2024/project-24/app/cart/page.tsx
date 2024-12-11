import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { Cart } from '@prisma/client';

import CartItemsList from '@/components/cart/CartItemsList';
import CartTotals from '@/components/cart/CartTotals';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchOrCreateCart, updateCart } from '@/utils/actions';

const CartPage = async () => {
  const { userId } = await auth();

  // 사용자 인증 정보가 없을 경우, 홈 화면으로 이동
  if (!userId) redirect('/');

  // 이전 장바구니 정보 불러오기 (없을 경우, 장바구니 새로 생성해서 불러오기)
  const previousCart = await fetchOrCreateCart({ userId });

  // 장바구니 업데이트하기
  const { currentCart, cartItems } = await updateCart(previousCart);

  // 장바구니 상품 개수가 0일 경우
  if (cartItems.length === 0) {
    return <SectionTitle text='Empty Cart.' />;
  }

  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
};

export default CartPage;
