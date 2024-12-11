import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useCallback, useState } from 'react';

import { useGlobalContext } from '../contexts/context';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const loader = useRef(null);

  // 한 번에 불러올 이미지 개수 설정
  const itemsCountParam = 9;

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['images', searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `${url}&query=${searchTerm}&page=${pageParam}&per_page=${itemsCountParam}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지가 있는지 확인
      if (lastPage.results.length < 1) return undefined;

      return allPages.length + 1;
    },
    enabled: !!searchTerm, // searchTerm이 있을 때만 쿼리 실행
    onSuccess: () => {
      setIsLoadingSkeleton(false); // 성공 시 skeleton 제거
    },
  });

  // 특정 시간 뒤에 불러오기
  const loadNextPageWithDelay = useCallback(() => {
    if (hasNextPage) {
      setTimeout(() => {
        fetchNextPage();
      }, 3000); // 3초
    }
  }, [fetchNextPage, hasNextPage]);

  const observer = useCallback(
    (node) => {
      if (isLoading || isFetchingNextPage) return;
      if (loader.current) loader.current.disconnect();

      loader.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          loadNextPageWithDelay();
        }
      });
      if (node) loader.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // 로딩 중일 때
  if (isLoading) {
    return (
      <section className="image-container-wrapper">
        <h4 className="description">Loading...</h4>
      </section>
    );
  }

  // 에러 발생 시
  if (isError) {
    return (
      <section className="image-container-wrapper">
        <h4 className="description">There was an error...</h4>
      </section>
    );
  }

  // 결과가 없을 때
  if (data?.pages[0].results.length < 1) {
    return (
      <section className="image-container-wrapper">
        <h4 className="description">No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container-wrapper">
      <div className="image-container">
        {data?.pages.map((page, pageIndex) =>
          page.results.map((item, index) => {
            const url = item?.urls?.regular;

            const isSkeleton =
              isLoadingSkeleton && pageIndex === data.pages.length - 1;

            return isSkeleton & (pageIndex > 0) ? (
              <div key={index} className="img skeleton" />
            ) : (
              <div key={item.id} className="img-wrapper">
                <img src={url} alt={item.alt_description} className="img" />
                <span className="tooltip">{item.alt_description}</span>
              </div>
            );
          })
        )}
      </div>
      <div ref={observer} style={{ height: '20px', marginBottom: '20px' }}>
        {isFetchingNextPage ? (
          <h4 className="description">Loading more...</h4>
        ) : (
          <h4 className="description">Loading...</h4>
        )}
      </div>
    </section>
  );
};

export default Gallery;
