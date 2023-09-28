'use client';

import Price from '@/components/Price';
import { Button } from '@/components/ui/button';
import { GetOneOrder } from '@/utils/order';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery([params.slug], {
    queryFn: () => getOrder(params.slug),
  });
  console.log(data?.order);
  return (
    <div className='bg-white'>
      <div className=' bg-white p-5  shadow-lg flex justify-between'>
        <Link href='/dashboard/orders'>
          <ArrowLeft />
        </Link>
        <Button type='button' id='button'>
          {isLoading ? '..laoding' : 'Add Product'}
        </Button>
      </div>{' '}
      <div className='flex p-24 flex-col justify-between overflow-hidden shadow mx-10 my-4'>
        <h1 className='text-center font-medium text-xl'>Order Details</h1>
        <ul className='flex-grow overflow-auto py-4'>
          {data?.order?.OrderItems.map((item, i) => {
            return (
              <li
                key={i}
                className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'
              >
                <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                  <div className='z-30 flex flex-row space-x-4'>
                    <div className='relative h-16 w-16  overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 '>
                      <Image
                        className='h-full w-full object-cover'
                        width={64}
                        height={64}
                        alt={item.product.name}
                        src={item.product.Images[0].imageUrl}
                      />
                    </div>

                    <div className='flex flex-1 flex-col text-base'>
                      <span className='leading-tight'>{item.product.name}</span>

                      <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex h-16 flex-col justify-between'>
                    <Price
                      className='flex justify-end space-y-2 text-right text-sm'
                      amount={item.product.price.toString()}
                      currencyCode={'NGN'}
                    />
                    <div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
                      <p className='w-6 text-center'>
                        <span className='w-full text-sm'>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
          <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
            <p>Shipping</p>

            <Price
              className='text-right text-base text-black dark:text-white'
              amount={'2000'}
              currencyCode={'NGN'}
            />
          </div>
          <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
            <p>Total</p>
            <Price
              className='text-right text-base text-black dark:text-white'
              amount={'2000'}
              currencyCode={'NGN'}
            />
          </div>
        </div>
      </div>
      <div className='flex p-24 flex-col justify-between overflow-hidden shadow mx-10 my-4'>
        <h1 className='text-center font-medium text-xl'>Customer Details</h1>
      </div>
    </div>
  );
}

async function getOrder(params: string): Promise<GetOneOrder> {
  const res = await fetch(`/api/orders/${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}