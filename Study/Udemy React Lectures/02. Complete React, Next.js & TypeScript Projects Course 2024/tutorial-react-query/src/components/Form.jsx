import { useState } from 'react';

import { useCreateTask } from '../hooks/reactQueryCustomHooks';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');

  // const queryClient = useQueryClient();

  // const { mutate: createTask, isPending } = useMutation({
  //   mutationFn: (taskTitle) => {
  //     return customFetch.post('/', { title: taskTitle });
  //   },
  //   onSuccess: () => {
  //     if (newItemName) {
  //       // 기존의 캐시된 데이터를 무효화하고, 해당 쿼리에 대한 데이터를 새로고침하기
  //       queryClient.invalidateQueries({ queryKey: ['tasks'] });

  //       // 성공 메시지 표시하기
  //       toast.success('task added.');

  //       // 입력창 비우기 및 화면 리랜더링
  //       setNewItemName('');
  //     }
  //   },
  //   onError: (error) => {
  //     // 에러 메시지 표시하기
  //     toast.error(error.response.data.msg);
  //   },
  // });

  const { createTaskLoading, createTask } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 작업 추가
    // -> createTask의 두 번째 인자에 작업 수행 후 수행할 작업을 추가할 수 있다.
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName('');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={createTaskLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
