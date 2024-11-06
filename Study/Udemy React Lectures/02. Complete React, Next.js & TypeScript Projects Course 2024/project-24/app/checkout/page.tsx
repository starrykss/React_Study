'use client';

import { useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  // URL 파라미터에서 주문ID, 장바구니ID 가져오기
  const orderId = searchParams.get('orderId');
  const cartId = searchParams.get('cartId');

  // Client Secret 정보 가져오기
  const fetchClientSecret = useCallback(async () => {
    // 결제 세션 생성하기 (/app/api/payment)
    const response = await axios.post('/api/payment', {
      orderId: orderId,
      cartId: cartId,
    });

    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
