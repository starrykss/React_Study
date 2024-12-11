import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    // 액션1 : 아이템 추가
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartID === product.cartID);

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      // 다른 리듀서에 직접 접근하여 실행하기 (caseReducers) ✅
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item added to cart!');
    },

    // 액션2 : 카트 비우기
    clearCart: (state) => {
      // 기본 상태로 변경
      localStorage.setItem('cart', JSON.stringify(defaultState));

      // 상태를 직접 수정하는 대신, 전체 상태를 기본값으로 "교체"하기 때문에 return 처리
      // -> 상태를 직접 '수정'할 경우, return 처리해줄 필요 없다.
      return defaultState;
    },

    // 액션3 : 아이템 삭제하기
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);

      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart!');
    },

    // 액션 4 : 아이템 수정하기
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);

      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Cart updated!');
    },

    // 액션 5 : 총합 구하기
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      // 로컬 스토리지에 추가
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
