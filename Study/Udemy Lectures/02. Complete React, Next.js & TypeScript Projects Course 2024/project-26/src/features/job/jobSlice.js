import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../../utils/localStorage';

import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

// 초기 상태값 설정
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

// [액션] 구직 기록 생성하기
export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    return createJobThunk('/jobs', job, thunkAPI);
  }
);

// [액션] 구직 기록 지우기
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, thunkAPI) => {
    return deleteJobThunk(`/jobs/${jobId}`, jobId, thunkAPI);
  }
);

// [액션] 구직 기록 수정하기
export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    return editJobThunk(`/jobs/${jobId}`, job, thunkAPI);
  }
);

// 슬라이스 생성
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    // <input> 요소 내용 변경 처리
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // 값 지우기
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    // 구직 기록 항목 수정하기
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // 구직 기록 생성하기
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('Job Created!');
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(`${payload}.`);
      })
      // 구직 기록 삭제하기
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(`Job Item Deleted Successfully!`);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(`${payload}.`);
      })
      // 구직 기록 수정하기
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('Job Modified!');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(`${payload}.`);
      });
  },
});

export default jobSlice.reducer;

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
