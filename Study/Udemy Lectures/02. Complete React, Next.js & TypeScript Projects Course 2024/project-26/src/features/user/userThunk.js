import authHeader from '../../utils/authHeader';
import customFetch from '../../utils/axios';

import { clearAllJobsState } from '../alljobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';

// 회원 가입
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 로그인
export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 사용자 정보 업데이트
export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user, authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    // console.log(error.response);

    // ✅ 400 (Bad Request)
    // - 요청 잘못됨.
    // - 프론트엔드에서 수정 가능
    // ✅ 401 (Unauthorized)
    // - 인증 실패
    // - 사용자가 리소스에 접근할 권한이 없음.
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }

    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 전역 스토어 초기화
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // 로그아웃
    thunkAPI.dispatch(logoutUser(message));

    // 구직 공고 관련 변수 초기화
    thunkAPI.dispatch(clearAllJobsState());

    // <input> 요소에 있는 요소 초기화
    thunkAPI.dispatch(clearValues());

    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
};
