import Stripe from 'stripe';
import { type NextRequest } from 'next/server';

import db from '@/utils/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');

  const { orderId, cartId } = await req.json();

  // 주문 정보 가져오기
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });

  // 장바구니 정보 가져오기
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // 주문 정보 또는 장바구니 정보가 없을 경우
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  // Stripe에 보낼 데이터
  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100, // 가격 단위 : 센트(Cent)
      },
    };
  });

  // 세션 만들기
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
