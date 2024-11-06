import {
  dehydrate, // 서버 측에서 데이터를 가져온 후 직렬화해 클라이언트에 전달할 때 사용
  HydrationBoundary, // React Query의 서버 사이드 렌더링(SSR)을 지원하는 컴포넌트, 클라이언트가 서버에서 전달받은 데이터를 사용할 수 있게 해준다.
  QueryClient, // 서버에 요청을 보내고 데이터를 캐싱하는 React Query 클라이언트
} from '@tanstack/react-query';

import { getAllJobsAction } from '@/utils/actions';

import JobsList from '@/components/JobsList';
import SearchForm from '@/components/SearchForm';

const JobsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchForm />
      <JobsList />
    </HydrationBoundary>
  );
};

export default JobsPage;
