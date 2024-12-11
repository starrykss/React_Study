'use client';

import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, useRouter } from 'next/navigation';

import { Input } from '../ui/input';

const NavSearch = () => {
  const searchParams = useSearchParams(); // 파라미터값 가져오기
  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );

  // 검색 처리
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    // 현재 경로를 새로운 경로로 대체
    replace(`/products?${params.toString()}`);
  }, 300); // 300ms delay

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams.get('search')]);

  return (
    <Input
      type="search"
      placeholder="Search Product..."
      className="max-w-xs dark:bg-muted "
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default NavSearch;
