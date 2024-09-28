import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCartItems, calculateTotals } from './features/cart/cartSliceAPI';

import Modal from './components/Modal';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Copyright from './components/Copyright';

const App = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.modal);

  // (1) API 버전
  const { cartItems, isLoading } = useSelector((state) => state.cart);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'));
  }, []);

  // 데이터를 불러오는 경우
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  // (2) 로컬 버전
  // const { cartItems } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(calculateTotals());
  // }, [cartItems]);

  return (
    <>
      {/* 모달 컴포넌트를 맨 위에 위치시켜 준다. */}
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
      <Copyright />
    </>
  );
};

export default App;
