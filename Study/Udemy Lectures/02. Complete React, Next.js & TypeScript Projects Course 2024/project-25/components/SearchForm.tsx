'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { JobStatus } from '@/utils/types';

import { Input } from './ui/input';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SearchForm = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const router = useRouter();
  const pathname = usePathname();

  // 폼 전송 이벤트 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;

    // URL 쿼리 파라미터 값 설정
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    // 해당 URL로 이동
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg'
      onSubmit={handleSubmit}
    >
      <Input
        type='text'
        placeholder='Search Jobs'
        name='search'
        defaultValue={search}
      />
      <Select defaultValue={jobStatus} name='jobStatus'>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['all', ...Object.values(JobStatus)].map((jobStatus) => {
            return (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default SearchForm;
