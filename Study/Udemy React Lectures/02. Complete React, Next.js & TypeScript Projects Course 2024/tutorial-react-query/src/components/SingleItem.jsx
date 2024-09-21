import { useDeleteTask, useEditTask } from '../hooks/reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  // const queryClient = useQueryClient();

  // // PATCH : 수정
  // const { mutate: editTask } = useMutation({
  //   mutationFn: ({ taskId, isDone }) => {
  //     return customFetch.patch(`/${taskId}`, { isDone });
  //   },
  //   onSuccess: () => {
  //     // 기존의 캐시 무효화 및 새로고침
  //     queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //   },
  // });

  // // DELETE : 삭제
  // const { mutate: deleteTask, isPending } = useMutation({
  //   mutationFn: ({ taskId }) => {
  //     return customFetch.delete(`/${taskId}`);
  //   },
  //   onSuccess: () => {
  //     // 기존의 캐시 무효화 및 새로고침
  //     queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //   },
  // });

  const { editTask } = useEditTask();
  const { deleteTask, deleteTaskLoading } = useDeleteTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteTaskLoading}
        onClick={() => deleteTask({ taskId: item.id })}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
