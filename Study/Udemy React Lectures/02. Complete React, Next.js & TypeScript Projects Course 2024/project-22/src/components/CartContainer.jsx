import { useDispatch, useSelector } from 'react-redux';

import { openModal } from '../features/modal/modalSlice';

import CartItem from './CartItem';

const CartContainer = () => {
  // 액션을 수행하기 위한 디스페치
  const dispatch = useDispatch();

  // 전역 상태 보관소의 값에 접근하기
  const { cartItems, total, amount } = useSelector((state) => state.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  } else {
    return (
      <section className="cart">
        {/* Cart Header */}
        <header>
          <h2>your bag</h2>
        </header>

        {/* Cart Items */}
        <div>
          {cartItems?.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        {/* Cart Footer */}
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total <span>${total.toFixed(2)}</span>
            </h4>
          </div>
          <button
            className="btn clear-btn"
            onClick={() => dispatch(openModal())}
          >
            clear cart
          </button>
        </footer>
      </section>
    );
  }
};

export default CartContainer;
