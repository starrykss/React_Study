import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showStats } from '../../features/allJobs/allJobsSlice';

import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  const dispatch = useDispatch();

  // 통계 정보 가져오기
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  // 로딩 중일 경우, 로딩 스피너 표시
  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
