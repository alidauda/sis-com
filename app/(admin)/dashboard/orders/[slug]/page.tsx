'use client';
import Customer from '@/components/Customer';
import Price from '@/components/Price';
import { Button } from '@/components/ui/button';
import { GetOneOrder } from '@/utils/order';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { use } from 'react';

type orderState = 'CANCELLED' | 'REJECTED' | 'COMPLETED';
const accpeted = 'bg-green-600 hover:bg-green-500';
const rejected = 'bg-red-600 hover:bg-red-500';
export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery([params.slug], {
    queryFn: () => getOrder(params.slug),
  });
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: ({ state }: { state: orderState }) =>
      updateOrder(params.slug, state),
    onSuccess: () => {
      toast.success('Order updated successfully');
      router.push('/dashboard/orders');
    },
  });
  return (
    <div className='bg-white'>
      <div className=' bg-white p-5  shadow-lg flex justify-between'>
        <Link href='/dashboard/orders'>
          <ArrowLeft />
        </Link>
        {data?.order ? (
          data?.order.status === 'COMPLETED' ||
          data?.order.status === 'REJECTED' ||
          data.order.status === 'CANCELLED' ? (
            <Button
              type='button'
              id='button'
              className={
                data.order.status === 'COMPLETED' ? accpeted : rejected
              }
            >
              {data?.order.status}
            </Button>
          ) : (
            <div className='gap-4 flex '>
              <Button
                type='button'
                id='button'
                className='bg-red-600 hover:bg-red-500'
                onClick={() => mutate({ state: 'REJECTED' })}
              >
                Reject Order
              </Button>
              <Button
                type='button'
                id='button'
                className='bg-green-600 hover:bg-green-500'
                onClick={() => mutate({ state: 'COMPLETED' })}
              >
                Accept Order
              </Button>
            </div>
          )
        ) : null}
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
      <div className='flex p-24 flex-col  overflow-hidden shadow mx-10 my-4'>
        <h1 className='text-center font-medium text-xl'>Customer Details</h1>
        <Customer
          firstValue='name'
          secondValue={data?.order.name!}
          thirdValue='Email'
          fourthValue={data?.order.email!}
        />
        <Customer
          firstValue='Phone'
          secondValue={data?.order.phoneNumber!}
          thirdValue='Delivery Address'
          fourthValue={data?.order.address!}
        />
        <Customer
          firstValue='City'
          secondValue={data?.order.city!}
          thirdValue='State'
          fourthValue={data?.order.state!}
        />
        <Customer
          firstValue='Country'
          secondValue={data?.order.country!}
          thirdValue='Status'
          fourthValue={data?.order.status!}
        />
      </div>
      <Toaster />
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

async function updateOrder(
  params: string,
  state: string
): Promise<GetOneOrder> {
  const res = await fetch(`/api/orders/${params}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state }),
  });
  const data = await res.json();
  return data;
}
