import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { openModal } from '../modal/modalSlice';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

// 상태 초기값 설정하기
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

// API 통신 후 데이터 가져오기
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);

      // thunkAPI를 이용하여 다양한 정보를 얻을 수 있다. (state 등)
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());

      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// 슬라이스 생성하기
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

  // (4) 추가 리듀서 설정
  // RTK 2.0부터 객체 형태가 아닌, '빌더 콜백' 형태로 사용한다.
  extraReducers: (builder) => {
    builder
      // pending 상태일 경우 (pending)
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })

      // 모두 불러와졌을 경우 (fulfilled)
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload; // 불러와진 데이터로 cartItem 업데이트
      })

      // 거절되었을 경우 (rejected)
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
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
