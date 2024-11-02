'use client';

import { usePathname } from 'next/navigation';

import LoadingTable from '@/components/global/LoadingTable';

const Loading = () => {
  const pathName = usePathname();

  const lastPath = pathName.split('/').pop() as keyof typeof sectionTitles;

  // console.log(lastPath);

  const sectionTitles = {
    create: 'Create Product',
    products: 'My Products',
    sales: 'Sales',
  };

  const title = sectionTitles[lastPath] || '';

  return (
    <>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>{title}</h1>
      <LoadingTable />
    </>
  );
};

export default Loading;
