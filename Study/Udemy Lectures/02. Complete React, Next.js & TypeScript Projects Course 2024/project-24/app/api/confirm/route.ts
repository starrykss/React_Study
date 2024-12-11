import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

import db from '@/utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id); // retrieve : 검색
    // console.log(session);

    // 주문ID, 장바구니ID 가져오기
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (session.status === 'complete') {
      // 주문 정보 업데이트하기
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });

      // 장바구니 정보 삭제하기
      await db.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
  } catch (err) {
    console.log(err);

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }

  // 주문 페이지로 이동
  redirect('/orders');
};
