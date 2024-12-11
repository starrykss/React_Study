import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ChartsContainer from '@/components/ChartsContainer';
import StatsContainer from '@/components/StatsContainer';
import { getChartsDataAction, getStatsAction } from '@/utils/actions';

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(), // 통계 정보 가져오기
  });

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(), // 차트 정보 가져오기
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};

export default StatsPage;
