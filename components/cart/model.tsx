'use client';

import { Dialog, Transition } from '@headlessui/react';

import Price from '../Price';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import OpenCart from './open-cart';
import CloseCart from './close-cart';
import { Cart } from '@/utils/cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.cartItems.length);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.cartItems.length !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.cartItems.length;
    }
  }, [isOpen, cart?.cartItems.length, quantityRef]);

  return (
    <>
      <button aria-label='Open cart' onClick={openCart}>
        <OpenCart quantity={cart?.cartItems.length} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className='relative z-50'>
          <Transition.Child
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='opacity-0 backdrop-blur-none'
            enterTo='opacity-100 backdrop-blur-[.5px]'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='opacity-100 backdrop-blur-[.5px]'
            leaveTo='opacity-0 backdrop-blur-none'
          >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition-all ease-in-out duration-300'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition-all ease-in-out duration-200'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <Dialog.Panel className='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]'>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold'>My Cart</p>

                <button aria-label='Close cart' onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart ? (
                <div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
                  <ShoppingCart className='h-16' />

                  <p className='mt-6 text-center text-2xl font-bold'>
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className='flex h-full flex-col justify-between overflow-hidden p-1'>
                  <ul className='flex-grow overflow-auto py-4'>
                    {cart.cartItems.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'
                        >
                          <div className='relative flex w-full flex-row justify-between px-1 py-4'>
                            <div className='absolute z-40 -mt-2 ml-[55px]'>
                              {/* <DeleteItemButton item={item} /> */}
                            </div>
                            <Link
                              href={
                                'https://utfs.io/f/156e5a20-daf7-4759-bb0a-95807d25ded9_WhatsApp%20Image%202023-08-29%20at%2018.46.49.png'
                              }
                              onClick={closeCart}
                              className='z-30 flex flex-row space-x-4'
                            >
                              <div className='relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
                                <Image
                                  className='h-full w-full object-cover'
                                  width={64}
                                  height={64}
                                  alt={item.product.name}
                                  src={item.product.image}
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
                                amount={'2000'}
                                currencyCode={'NGN'}
                              />
                              <div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
                                {/* <EditItemQuantityButton item={item} type="minus" /> */}
                                <p className='w-6 text-center'>
                                  <span className='w-full text-sm'>
                                    {item.product.quantity}
                                  </span>
                                </p>
                                {/* <EditItemQuantityButton item={item} type="plus" /> */}
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
                      <p className='text-right'>Calculated at checkout</p>
                    </div>
                    <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
                      <p>Total</p>
                      <Price
                        className='text-right text-base text-black dark:text-white'
                        amount={'4000'}
                        currencyCode={'NGN'}
                      />
                    </div>
                  </div>
                  {/* <a
                    href={cart.checkoutUrl}
                    className='block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
                  >
                    Proceed to Checkout
                  </a> */}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
