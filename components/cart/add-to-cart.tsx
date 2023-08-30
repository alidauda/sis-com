'use client';

import clsx from 'clsx';

import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import LoadingDots from '../loading';
import { Product } from '@/utils/product';
import NextAuthProvider from '@/session/session';
import { useSession } from 'next-auth/react';
import ReactQueryHelper from '@/utils/react-query';
import CartButton from './cart-button';

export function AddToCart({ product }: { product: Product }) {
  return (
    <NextAuthProvider>
      <ReactQueryHelper>
        <CartButton product={product} />
      </ReactQueryHelper>
    </NextAuthProvider>
  );
}
