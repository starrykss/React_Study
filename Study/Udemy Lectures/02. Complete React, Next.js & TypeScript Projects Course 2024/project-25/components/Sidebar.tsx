'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/assets/images/logo.svg';
import links from '@/utils/links';
import { Button } from './ui/button';

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className='py-4 px-8 bg-muted h-full'>
      <Link href='/'>
        <Image src={Logo} alt='logo' className='mx-auto' />
      </Link>
      <div className='flex flex-col mt-20 gap-y-4'>
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathName === link.href ? 'default' : 'link'}
            >
              <Link href={link.href} className='flex items-center gap-x-2'>
                {link.icon} <span className='capitalize'>{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
