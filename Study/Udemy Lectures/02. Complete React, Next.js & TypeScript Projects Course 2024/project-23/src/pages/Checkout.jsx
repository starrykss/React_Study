import { useSelector } from 'react-redux';

import { CheckoutForm, SectionTitle, CartTotals } from '../components';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

// 로더 정의
export const loader = (store) => () => {
  // getState() 함수를 통해 스토어 가져오기
  const user = store.getState().userState.user;

  // 로그인이 되어 있지 않을 경우, 로그인 해야 한다고 경고 메시지 표시하기
  if (!user) {
    toast.warn('You must log in to checkout.');

    return redirect('/login');
  }

  // 로더는 항상 return 값이 있어야 한다.
  return null;
};

//
// 페이지를 랜더링하기 전에 loader가 실행되기 때문에
// 로그인이 되어 있지 않을 경우, Checkout 페이지에 접근할 수 없게 할 수 있다.
//

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty." />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
