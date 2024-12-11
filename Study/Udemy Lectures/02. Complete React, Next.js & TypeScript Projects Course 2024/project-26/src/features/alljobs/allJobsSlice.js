import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getAllJobsThunk, showStatsThunk } from './allJobsThunk';

// 필터 초기값 설정
const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

// 초기 상태값 설정
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// [액션] 모든 구직 기록 정보 가져오기
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    return getAllJobsThunk(url, thunkAPI);
  }
);

// [액션] 통계 정보 가져오기
export const showStats = createAsyncThunk(
  'allJobs/showStats',
  async (_, thunkAPI) => {
    return showStatsThunk('/jobs/stats', thunkAPI);
  }
);

// 슬라이스 생성
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    // 로딩 상태 표시하기
    showLoading: (state) => {
      state.isLoading = true;
    },
    // 로딩 상태 가리기
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // <input> 요소 변경 처리
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1; // 검색 컨테이너 <input> 요소 변화 시, 항상 첫 페이지로 이동
      state[name] = value;
    },
    // 검색 필터 내용 초기화
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    // 페이지 전환
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    // 구직 공고 관련 변수 초기화
    clearAllJobsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 모든 구직 기록 정보 가져오기
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;

        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(`${payload}.`);
      })
      // 통계 정보 가져오기
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;

        toast.error(`${payload}.`);
      });
  },
});

// 액션 내보내기
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
