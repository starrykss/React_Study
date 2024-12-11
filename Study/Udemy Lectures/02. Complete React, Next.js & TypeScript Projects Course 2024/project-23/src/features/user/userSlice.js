import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// 테마
const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

// 로컬 스토리지에서 테마 정보 가져오기
const getThemeFromLocalStorage = () => {
  // 로컬 스토리지에 테마값이 없으면 기본으로 winter 모드 설정
  const theme = localStorage.getItem('theme' || themes.winter);
  document.documentElement.setAttribute('data-theme', theme);

  return theme;
};

// 로컬 스토리지에서 유저 정보 가져오기
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

// 초기 상태 정의
const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 액션1 : 로그인
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };

      // 유저 상태 변수 업데이트
      state.user = user;

      // 로컬 스토리지에 정보 추가
      localStorage.setItem('user', JSON.stringify(user));
    },

    // 액션 2 : 로그아웃
    logoutUser: (state) => {
      // 로컬 스토리지에서 user 관련 정보를 지워준다.
      state.user = null;

      // localStorage.clear()
      localStorage.removeItem('user');
      toast.success('Logged out successfully!');
    },

    // 액션 3 : 테마 토글
    toggleTheme: (state) => {
      const { dracula, winter } = themes;

      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

// 리듀서 내보내기
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
