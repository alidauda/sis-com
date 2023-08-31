'use client';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { startTransition, useTransition } from 'react';
import LoadingDots from '../loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Product } from '@/utils/product';
import { useMutation } from '@tanstack/react-query';

export default function CartButton({ product }: { product: Product }) {
  const mutation = useMutation({
    mutationFn: () => addToCart(product.id),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const router = useRouter();
  const session = useSession();

  const [isPending, startTransition] = useTransition();
  return (
    <button
      aria-label='Add item to cart'
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          if (!session.data) {
          }
          mutation.mutate();
        });
      }}
      title={'for sale'}
      className={clsx(
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90'
      )}
    >
      <div className='absolute left-0 ml-4'>
        {!isPending ? (
          <Plus className='h-5' />
        ) : (
          <LoadingDots className='mb-3 bg-white' />
        )}
      </div>
      <span>{'Add To Cart'}</span>
    </button>
  );
}

async function addToCart(id: string) {
  const add = await fetch(`/api/cart/add-to-cart/${id}`, {
    method: 'POST',
  });
  const res = await add.json();
  return res;
}
