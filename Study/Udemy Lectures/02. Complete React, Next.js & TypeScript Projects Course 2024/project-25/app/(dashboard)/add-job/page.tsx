import CreateJobForm from '@/components/CreateJobForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const AddJobPage = () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
};

export default AddJobPage;

/* (1) dehydrate
  > 서버 측에서 쿼리 데이터를 미리 패치하고, 이를 직렬화하여 클라이언트 측에 전달할 때 사용하는 함수
  > 이를 통해 페이지가 로드될 때 서버에서 미리 패치한 데이터를 클라이언트 측에서 사용할 수 있게 한다.
 */

/* (2) HydrationBoundary
  > @tanstack/react-query에서 제공하는 컴포넌트
  > 서버에서 가져온 쿼리 데이터를 클라이언트로 주입하는 역할을 한다.
  > 여기서는 state={dehydrate(queryClient)}로 queryClient의 상태를 받아 클라이언트에 주입한다.
  > 이 방법으로 클라이언트는 서버에서 미리 가져온 데이터를 그대로 사용할 수 있다.
 */

/*
  > 이 페이지는 서버에서 쿼리 데이터를 미리 패치하고, 클라이언트 측에 전달하여 초기 로딩 시 빠르게 데이터를 사용할 수 있게 한다.
  > HydrationBoundary를 통해 서버 데이터를 클라이언트와 공유하여, 추가적인 데이터 로딩 없이도 즉시 데이터를 사용할 수 있게 하여 사용자 경험을 향상시킨다.
 */
