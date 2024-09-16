import { useContext, useReducer, useEffect, createContext } from 'react';
import reducer from './reducer';

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

import cartItems from '../data';
import { getTotals } from '../utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

// Initial State
// - 더 효율적인 자료 검색을 위해 [{ id, img, ... }, { id, img, ... }, ...]를 아래와 같은 형태로 변환한다.
/*
new Map([
  [
      "rec1JZlfCIBOPdcT2",
      {
          "id": "rec1JZlfCIBOPdcT2",
          "title": "Samsung Galaxy S8",
          "price": "399.99",
          "img": "https://www.course-api.com/images/cart/phone-1.png",
          "amount": 1
      }
  ],
  [
      "recB6qcHPxb62YJ75",
      {
          "id": "recB6qcHPxb62YJ75",
          "title": "google pixel",
          "price": "499.99",
          "img": "https://www.course-api.com/images/cart/phone-2.png",
          "amount": 1
      }
  ],
  ...
])
*/

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(), // new Map(cartItems.map((item) => [item.id, item])),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 전체 상품 개수, 총 가격
  const { totalAmount, totalCost } = getTotals(state.cart);

  // 카트 비우기 기능
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // 아이템 삭제 기능
  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  // 아이템 개수 증가 기능
  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  // 아이템 개수 감소 기능
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  // 데이터 불러오기
  const fetchData = async () => {
    dispatch({ type: LOADING });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
