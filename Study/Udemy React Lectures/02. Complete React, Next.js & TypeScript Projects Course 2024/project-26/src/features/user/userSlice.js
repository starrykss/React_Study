import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './userThunk';

// 초기 상태값 설정
const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

// [액션] 회원 가입
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

// [액션] 로그인
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

// [액션] 사용자 계정 정보 변경하기
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);

// [액션] 전역 스토어 초기화하기
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);

// 슬라이스 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 사이드바 토글
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // 로그아웃
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;

      toast.success('Logout Successful!');

      // 메시지를 전달 받을 경우, 토스트 메시지 띄우기
      if (payload) {
        toast.success(`${payload}.`);
      }

      // 로컬 스토리지에서 계정 정보 지우기
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원 가입
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);

        toast.success(`Hello There, ${user.name}!`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(`${payload}.`);
      })
      // 로그인
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);

        toast.success(`Welcome Back, ${user.name}!`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(`${payload}.`);
      })
      // 사용자 계정 정보 업데이트
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;

        state.isLoading = false;
        state.user = user;

        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(`${payload}.`);
      })
      // 전역 스토어 지우기
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error...');
      });
  },
});

export default userSlice.reducer;

export const { toggleSidebar, logoutUser } = userSlice.actions;
