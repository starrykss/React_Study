import { useFetchTasks } from '../hooks/reactQueryCustomHooks';

import SingleItem from './SingleItem';

const Items = () => {
  // cf. React Query V5부터 isLoading 대신 isPending을 사용한다.
  // const { isPending, data, isError, error } = useQuery({
  //   queryKey: ['tasks'],
  //   queryFn: async () => {
  //     const { data } = await customFetch.get('/');
  //     return data;
  //   },
  // });

  // 커스텀 훅 불러오기
  const { isPending, isError, error, data } = useFetchTasks();

  if (isPending) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>;
  }

  // 에러가 발생했다는 메시지 표시하기
  if (isError) {
    return <p style={{ marginTop: '1rem' }}>There was an error...</p>;
  }

  // 실제 에러 메시지 표시하기
  // if (error) {
  //   return <p style={{ marginTop: '1rem' }}>{error.response.data}</p>;
  // }

  const fetchedData = data.taskList;

  return (
    <div className="items">
      {fetchedData.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
