import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import customFetch from '../utils/utils';

// GET : 데이터 불러오기
export const useFetchTasks = () => {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');

      return data;
    },
  });
  return { isPending, isError, error, data };
};

// POST : 데이터 생성
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: createTaskLoading } = useMutation({
    mutationFn: (taskTitle) => {
      return customFetch.post('/', { title: taskTitle });
    },
    onSuccess: () => {
      // 기존의 캐시된 데이터를 무효화하고, 해당 쿼리에 대한 데이터를 새로고침하기
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      // 성공 메시지 표시하기
      toast.success('task added.');
    },
    onError: (error) => {
      // 에러 메시지 표시하기
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, createTaskLoading };
};

// PATCH : 데이터 수정
export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      // 기존의 캐시 무효화 및 새로고침
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { editTask };
};

// DELETE : 데이터 삭제
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: deleteTaskLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      // 기존의 캐시 무효화 및 새로고침
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { deleteTask, deleteTaskLoading };
};
