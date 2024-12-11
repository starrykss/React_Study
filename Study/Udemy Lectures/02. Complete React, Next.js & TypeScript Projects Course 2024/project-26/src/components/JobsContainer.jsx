import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Wrapper from '../assets/wrappers/JobsContainer';

import { getAllJobs } from '../features/alljobs/allJobsSlice';

import Job from './Job';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  // 등록한 구직 기록 정보 가져오기
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch, page, search, searchStatus, searchType, sort]);

  // 로딩중 화면 표시
  if (isLoading) {
    return <Loading center />;
  }

  // 등록한 구직 기록이 없을 경우
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to Display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{jobs.length > 1 && 's'} Found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
