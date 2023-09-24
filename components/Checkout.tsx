import * as React from 'react';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { useSession } from 'next-auth/react';
import { useAddOrderHook } from '@/utils/addtoCartHook';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQueryHelper from '@/utils/react-query';

import Price from './Price';
import DeleteItemButton from './cart/Delete';
import EditItemQuantityButton from './cart/Edit';
import closeCart from './cart/close-cart';
import Image from 'next/image';
import Link from 'next/link';
import { usePaystackHook } from '@/utils/paystackHook';
const contactSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(2),
  apartment: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  state: z.string().min(2),
  phoneNumber: z.string().min(10),
});
export default function CardWithForm({
  cartItems,
}: {
  cartItems: {
    items: {
      quantity: number;
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
    }[];
    total: number;
    quantity: number;
  };
}) {
  const { data } = useSession();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      state: '',
      phoneNumber: '',
    },
  });
  const mutation = useAddOrderHook({ order: cartItems });
  const paystack = usePaystackHook({
    config: {
      amount: cartItems.total,
      email: form.getValues('email'),
      firstname: form.getValues('firstName'),
      lastname: form.getValues('lastName'),
      phone: form.getValues('phoneNumber'),
    },
  });
  const onSuccess = (reference: ReferenceType) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference.status === 'success') {
      mutation.mutate({
        full_name: `${form.getValues('firstName')} ${form.getValues(
          'lastName'
        )}`,
        email: form.getValues('email'),
        phoneNumber: form.getValues('phoneNumber'),
        address: form.getValues('address'),
        city: form.getValues('city'),
        state: form.getValues('state'),
        country: form.getValues('country'),
        reference: reference.reference,
        payemnt_status: reference.status,
      });
    }
  };

  async function onSubmit(data: z.infer<typeof contactSchema>) {
    paystack(onSuccess, onClose);
  }
  return (
    <div className='grid grid-flow-col h-[100dvh] '>
      <div className='bg-white px-24 py-10 grid'>
        <Form {...form}>
          <div className='text-xl font-bold '> Contact information</div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className='text-xl font-bold '> Shipping information</div>
          <div className='grid grid-flow-col gap-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='apartment'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Apartment, suite, etc.</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className='grid grid-flow-col gap-6 '>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input disabled={true} {...field} value={'Nigeria'} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className='grid grid-flow-col gap-6'>
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>State / Province</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </Form>
      </div>
      <div className='px-24 py-10'>
        {' '}
        <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
          <ul className='flex-grow overflow-auto py-4'>
            {cartItems?.items &&
              cartItems.items.map((item, i) => {
                return (
                  <li
                    key={i}
                    className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'
                  >
                    <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                      <div className='absolute z-40 -mt-2 ml-[55px]'>
                        <DeleteItemButton />
                      </div>
                      <Link
                        href={item.product.Images[0].imageUrl}
                        className='z-30 flex flex-row space-x-4'
                      >
                        <div className='relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                          <Image
                            className='h-full w-full object-cover'
                            width={64}
                            height={64}
                            alt={item.product.name}
                            src={item.product.Images[0].imageUrl}
                          />
                        </div>

                        <div className='flex flex-1 flex-col text-base'>
                          <span className='leading-tight'>
                            {item.product.name}
                          </span>

                          <p className='text-sm text-neutral-500 dark:text-neutral-400'>
                            {item.product.name}
                          </p>
                        </div>
                      </Link>
                      <div className='flex h-16 flex-col justify-between'>
                        <Price
                          className='flex justify-end space-y-2 text-right text-sm'
                          amount={item.product.price.toString()}
                          currencyCode={'NGN'}
                        />
                        <div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
                          <ReactQueryHelper>
                            <EditItemQuantityButton type='minus' item={item} />
                          </ReactQueryHelper>
                          <p className='w-6 text-center'>
                            <span className='w-full text-sm'>
                              {item.quantity}
                            </span>
                          </p>
                          <ReactQueryHelper>
                            <EditItemQuantityButton type='plus' item={item} />
                          </ReactQueryHelper>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700'>
              <p>Taxes</p>
              <Price
                className='text-right text-base text-black dark:text-white'
                amount={'400'}
                currencyCode={'NGN'}
              />
            </div>
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
                amount={cartItems!.total?.toString()}
                currencyCode={'NGN'}
              />
            </div>
          </div>
          <Button
            className='block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100 hover:bg-blue-400'
            onClick={() => {}}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

// you can call this function anything

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

type ReferenceType = {
  message: string;

  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
};
