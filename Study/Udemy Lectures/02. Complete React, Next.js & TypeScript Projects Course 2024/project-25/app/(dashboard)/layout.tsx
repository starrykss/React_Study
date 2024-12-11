import { PropsWithChildren } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='grid lg:grid-cols-5'>
      {/* First-column hide on small screen */}
      <div className='hidden lg:block lg:col-span-1 lg:min-h-screen'>
        <Sidebar />
      </div>

      {/* Second-column hide dropdown on big screen */}
      <div className='lg:col-span-4'>
        <Navbar />
        <div className='py-16 px-4 sm:px-8 lg:px-16'>{children}</div>
      </div>
    </main>
  );
};

export default layout;
