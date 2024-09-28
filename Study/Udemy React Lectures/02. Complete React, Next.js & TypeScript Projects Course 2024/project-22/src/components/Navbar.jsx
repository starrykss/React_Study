import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // 전역 상태 보관소의 값 접근하기
  const { amount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className="nav-center">
        <h3>Cart with Redux Toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
