import axios from 'axios';

import { getUserFromLocalStorage } from './localStorage';

import { clearStore } from '../features/user/userSlice';

// 공통으로 사용되는 Axios 인스턴스 생성
const customFetch = axios.create({
  baseURL: 'https://redux-toolkit-jobster-api-server.onrender.com/api/v1',
});

// Axios 요청이 실행되기 전에 실행되는 작업 추가
// -> request 인터셉터는 요청이 서버로 전송되기 전에 호출된다.
customFetch.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const user = getUserFromLocalStorage();

    // 사용자 정보가 있을 경우
    if (user) {
      // 인증 정보 추가하기
      config.headers['Authorization'] = `Bearer ${user.token}`;
      // 최신 버전에서 'common'을 추가할 경우, undefined가 반환된다.
      // config.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 비인증된 사용자의 요청인지 확인
// - 일정 시간이 지날 경우, 로그인 토큰이 만료되어 인증을 통한 API 요청을 할 수 없게됨.
// - 따라서 알림 메시지로 알려준 후, 로그아웃 처리 및 전역 스토어 초기화 작업 진행
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  // 401 : 인증 오류
  if (error.response.status === 401) {
    // 로그아웃 + 전역 스토어 초기화
    thunkAPI.dispatch(clearStore());

    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
