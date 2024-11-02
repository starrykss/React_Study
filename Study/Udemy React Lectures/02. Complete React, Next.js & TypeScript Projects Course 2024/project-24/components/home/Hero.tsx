import Link from 'next/link';

import { Button } from '../ui/button';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia ipsa
          dolor, ab atque quae odio odit aliquid rem reprehenderit! Dolores nemo
          odit velit eligendi ea eos similique vel eum est! Tempore corporis
          enim eligendi hic, adipisci perferendis debitis sed beatae nobis
          commodi reiciendis nisi expedita saepe ratione consequatur deserunt
          architecto nostrum fugit aspernatur natus quaerat iure vero. In, amet
          fugit?
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;
