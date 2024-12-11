'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from './ui/button';

// 타입 정의
type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

const ButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 5 => [1, 2, 3, 4, 5]
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 페이지 이동 이벤트 처리
  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      jobStatus: searchParams.get('jobStatus') || '',
      page: String(page),
    };

    const params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex gap-x-2'>
      {pageButtons.map((page) => {
        return (
          <Button
            key={page}
            size='icon'
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonContainer;
