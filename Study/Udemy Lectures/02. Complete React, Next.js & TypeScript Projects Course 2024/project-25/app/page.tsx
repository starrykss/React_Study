import Image from 'next/image';

import LogoImg from '../assets/images/logo.svg';
import LandingImg from '../assets/images/main.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Copyright from '@/components/Copyright';

const Home = () => {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Link href='/'>
          <Image src={LogoImg} alt='logo' />
        </Link>
      </header>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='leading-loose max-w-md mt-4'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
            earum veritatis nesciunt officiis deleniti ducimus vel corrupti
            perspiciatis eligendi! Veniam officiis adipisci optio aut maxime
            nobis quis harum corrupti beatae.
          </p>
          <Button asChild className='mt-4'>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt='landing' className='hidden lg:block' />
      </section>
      <Copyright />
    </main>
  );
};

export default Home;
