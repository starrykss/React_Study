import customFetch from '../../utils/axios';
import authHeader from '../../utils/authHeader';

import { clearValues } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../alljobs/allJobsSlice';
import { logoutUser } from '../user/userSlice';

// 구직 기록 생성하기
export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job, authHeader(thunkAPI));

    // <input> 요소 값 제거하기
    thunkAPI.dispatch(clearValues());

    return response.data;
  } catch (error) {
    // 인증 오류 발생 시, 로그아웃 처리
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }

    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 구직 기록 지우기
export const deleteJobThunk = async (url, jobId, thunkAPI) => {
  // 로딩 상태 표시하기
  thunkAPI.dispatch(showLoading());

  try {
    const response = await customFetch.delete(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    // 모든 구직 기록 정보 가져오기
    thunkAPI.dispatch(getAllJobs());

    return response.data;
  } catch (error) {
    // 로딩 상태 가리기
    thunkAPI.dispatch(hideLoading());

    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// 구직 기록 수정하기
export const editJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    // <input> 요소 내용 비우기
    thunkAPI.dispatch(clearValues());

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
