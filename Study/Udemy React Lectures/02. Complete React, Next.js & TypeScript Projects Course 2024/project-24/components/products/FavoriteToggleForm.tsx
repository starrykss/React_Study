'use client';

import { usePathname } from 'next/navigation';

import { toggleFavoriteAction } from '@/utils/actions';

import FormContainer from '../form/FormContainer';
import { CardSubmitButton } from '../form/Buttons';

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleForm = ({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) => {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
