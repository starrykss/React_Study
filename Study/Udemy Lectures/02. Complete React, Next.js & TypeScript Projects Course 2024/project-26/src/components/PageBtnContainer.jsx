import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';

import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/alljobs/allJobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    // 1부터 numOfPage 까지 숫자 생성
    return index + 1;
  });

  // 다음 페이지 이동 이벤트 처리
  const nextPage = () => {
    let newPage = page + 1;

    // 다음 페이지 값이 전체 페이지 값보다 더 클 경우
    if (newPage > numOfPages) {
      newPage = 1; // 첫 번째 페이지로 이동
    }

    dispatch(changePage(newPage));
  };

  // 이전 페이지 이동 이벤트 처리
  const prevPage = () => {
    let newPage = page - 1;

    // 이진 페이지 값이 1 보다 더 작을 경우
    if (newPage < 1) {
      newPage = numOfPages; // 마지막 페이지로 이동
    }

    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
