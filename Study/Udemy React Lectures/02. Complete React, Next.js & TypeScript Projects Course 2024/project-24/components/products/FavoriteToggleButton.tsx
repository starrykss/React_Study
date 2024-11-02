import { FaHeart } from 'react-icons/fa';
import { auth } from '@clerk/nextjs/server';
import { fetchFavoriteId } from '@/utils/actions';

import { CardSignInButton } from '../form/Buttons';
import FavoriteToggleForm from './FavoriteToggleForm';

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = await auth();

  if (!userId) {
    return <CardSignInButton />;
  }

  const favoriteId = await fetchFavoriteId({ productId });

  return <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />;
};

export default FavoriteToggleButton;
