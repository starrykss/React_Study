import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartItemsList, SectionTitle, CartTotals } from '../components';

const Cart = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  // temp
  const user = useSelector((state) => state.userState.user);

  // 카트에 담긴 아이템이 없을 경우
  if (numItemsInCart === 0) {
    return <SectionTitle text="Your Cart is Empty." />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8  lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to Checkout
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-block mt-8 uppercase"
            >
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
