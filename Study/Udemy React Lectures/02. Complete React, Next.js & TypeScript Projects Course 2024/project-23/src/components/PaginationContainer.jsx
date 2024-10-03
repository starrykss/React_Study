import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    // console.log(search);
    // console.log(pathname);
    // console.log(pageNumber);

    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber); // 쿼리 파라미터 설정

    // console.log(searchParams.toString()); // 'page=x'

    // 페이지 이동
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;

            // 페이지 번호가 1보다 작을 경우
            if (prevPage < 1) {
              prevPage = 1;
            }

            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;

            // 페이지 번호가 전체 페이지 수보다 클 경우
            if (nextPage > pageCount) {
              nextPage = pageCount;
            }

            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
