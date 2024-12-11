import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { customFetch, formatPrice } from '../utils';

import { clearCart } from '../features/cart/cartSlice';

import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';

// 액션 정의
export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    // getState()를 이용하여 전역 상태 값을 가져온다.
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        // 인증 정보 전송
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // 쿼리 지우기
      queryClient.removeQueries(['orders']);

      // 액션 디스패치 : 카트 비우기
      store.dispatch(clearCart());

      toast.success('Order placed successfully!');

      // 주문 페이지로 리다이렉션
      return redirect('/orders');
    } catch (error) {
      // console.log(error);

      const errorMessage =
        `${error?.response?.data?.error?.message}.` ||
        'There was an error placing your order.';

      toast.error(errorMessage);

      // 에러 상태 코드가 401 또는 403일 경우
      // -> 401 : 인증 정보가 없거나 잘못되었을 때 (로그인 X or 잘못된 자격 증명 제공) (Unauthorized)
      // -> 403 : 인증은 받았지만, 접근 권한이 없을 때 (Forbidden)
      if (error?.response?.status === 401 || 403) {
        // 로그인 페이지로 이동
        return redirect('/login');
      }

      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
