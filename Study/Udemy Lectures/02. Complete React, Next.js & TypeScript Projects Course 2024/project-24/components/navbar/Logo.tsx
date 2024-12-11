import Link from 'next/link';
import { VscCode } from 'react-icons/vsc';

import { Button } from '../ui/button';

const Logo = () => {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <VscCode className="w-6 h-6"></VscCode>
      </Link>
    </Button>
  );
};

export default Logo;
