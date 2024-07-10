import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from 'react-router-dom';
import {
  useQuery,
  // useMutation
} from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

export default function EditEvent() {
  const params = useParams();
  const { state } = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  // 데이터 불러오기 관련
  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) =>
      fetchEvent({
        signal: signal,
        id: params.id,
      }),
    staleTime: 10000, // 10초
  });

  // 데이터 수정 관련
  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     // Optimistic Updating
  //     // mutate() 함수에 인자로 전달한 것을 받아서 가져올 수 있다.
  //     const newEvent = data.event;

  //     // 활성 쿼리 취소하기
  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });

  //     // 이전의 이벤트 정보 가져오기 (에러 발생 시 롤백하기 위해)
  //     const previousEvent = queryClient.getQueryData(['events', params.id]);

  //     queryClient.setQueryData(['events', params.id], newEvent);

  //     return { previousEvent }; // context로 반환
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     // 성공하든 실패하든 처리할 작업
  //     queryClient.invalidateQueries(['events', params.id]);
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({
    //   id: params.id,
    //   event: formData,
    // });
    // navigate('../');
    submit(formData, {
      method: 'PUT',
    });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            ' Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// 페이지를 로드하기 전에 수행할 작업들
export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) =>
      fetchEvent({
        signal: signal,
        id: params.id,
      }),
  });
}

// 폼이 제출될 때 수행할 작업들
export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  await updateEvent({
    id: params.id,
    event: updatedEventData,
  });

  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}
