import authHeader from '../../utils/authHeader';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

// 모든 구직 기록 정보 가져오기
export const getAllJobsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url, authHeader(thunkAPI));

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 통계 정보 가져오기
export const showStatsThunk = async (url, thunkAPI) => {
  try {
    const response = await customFetch.get(url);

    return response.data;
  } catch (error) {
    // 비인증된 사용자의 요청일 경우, 로그아웃 + 전역 스토어 초기화
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
