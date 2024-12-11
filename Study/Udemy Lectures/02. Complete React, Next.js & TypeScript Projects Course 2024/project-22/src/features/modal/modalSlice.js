import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 액션1 : 모달 열기
    openModal: (state, action) => {
      state.isOpen = true;
    },

    // 액션2 : 모달 닫기
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

// 리듀서 내보내기
export default modalSlice.reducer;

// 액션 내보내기
export const { openModal, closeModal } = modalSlice.actions;
