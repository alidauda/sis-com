import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';

import clsx from 'clsx';
import LoadingDots from '../LoadingDot';
import { useMutation } from '@tanstack/react-query';
import { boolean } from 'zod';

export default function EditItemQuantityButton({
  item,
  type,
}: {
  type: 'plus' | 'minus';
  item: {
    id: string;
    product: {
      id: string;
      name: string;
      price: string;
      description: string;
      Images: {
        imageUrl: string;
      }[];
    };
    quantity: number;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { mutate, isLoading } = useMutation({
    mutationFn: (del?: boolean) => incDc(item.id, type, del),
    onSuccess: (data) => {
      router.refresh();
    },
  });

  return (
    <button
      aria-label={
        type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'
      }
      onClick={() => {
        startTransition(async () => {
          type === 'minus' && item.quantity - 1 === 0
            ? mutate(true)
            : mutate(false);
        });
      }}
      disabled={(isPending && isLoading) || item.quantity === 1}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': isPending && isLoading,
          'ml-auto': type === 'minus',
        }
      )}
    >
      {isPending && isLoading ? (
        <LoadingDots className='bg-black dark:bg-white' />
      ) : type === 'plus' ? (
        <Plus className='h-4 w-4 dark:text-neutral-500' />
      ) : (
        <Minus className='h-4 w-4 dark:text-neutral-500' />
      )}
    </button>
  );
}

async function incDc(id: string, type: 'plus' | 'minus', del?: boolean) {
  const incDce = await fetch('/api/cart', {
    method: 'POST',
    body: JSON.stringify({
      type,
      id,
      del,
    }),
  });
  const data = await incDce.json();
  return data;
}
