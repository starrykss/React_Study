'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import {
  addToCartAction,
  fetchOrCreateCart,
  updateCart,
} from '@/utils/actions';

import CartItemsList from '@/components/cart/CartItemsList';
import CartTotals from '@/components/cart/CartTotals';
import SectionTitle from '@/components/global/SectionTitle';

import { Mode } from './SelectProductAmount';
import SelectProductAmount from './SelectProductAmount';

import { ProductSignInButton, SubmitButton } from '../form/Buttons';
import FormContainer from '../form/FormContainer';

const AddToCart = ({ productId }: { productId: string }) => {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className='mt-4'>
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type='hidden' name='productId' value={productId} />
          <input type='hidden' name='amount' value={amount} />
          <SubmitButton text='add to cart' className='mt-8' />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
};

export default AddToCart;
