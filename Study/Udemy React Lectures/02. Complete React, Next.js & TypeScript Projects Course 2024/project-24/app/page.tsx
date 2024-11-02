import { Suspense } from 'react';

import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from '@/components/home/Hero';
import LoadingContainer from '@/components/global/LoadingContainer';
import SectionTitle from '@/components/global/SectionTitle';

const HomePage = () => {
  const fallbackContent = (
    <section className='pt-24'>
      <SectionTitle text='featured products' />
      <LoadingContainer />
    </section>
  );
  return (
    <>
      <Hero />
      <Suspense fallback={fallbackContent}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
};

export default HomePage;
