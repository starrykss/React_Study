import { createSlice } from '@reduxjs/toolkit';

import cartItems from '../../cartItems';

// 상태 초기값 설정하기
const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

// 슬라이스 생성
const cartSlice = createSlice({
  // (1) 슬라이스 이름 설정
  name: 'cart',

  // (2) 상태 초기값 설정
  initialState,

  // (3) 리듀서 설정
  reducers: {
    // 액션1 : 카트 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },

    // 액션2 : 아이템 삭제하기
    removeItem: (state, action) => {
      const itemId = action.payload;

      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // 액션3 : 아이템 개수 증가시키기
    // payload에는 dispatch를 수행하는 외부 컴포넌트에서 보내는 값이 들어있다.
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      cartItem.amount = cartItem.amount + 1;
    },

    // 액션4 : 아이템 개수 감소시키기
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      cartItem.amount = cartItem.amount - 1;
    },

    // 액션5 : 전체 아이템 개수 및 가격 계산하기
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// <1> 리듀서 내보내기
// - 기본 내보내기를 했기 때문에, 외부에서 불러올 때는 아무 이름으로 불러올 수 있다.
// 예) import cartReducer from './features/cart/cartSlice';
export default cartSlice.reducer;

// <2> 액션 내보내기
// 외부에서 사용할 수 있는 액션을 내보낸다.
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
