import Link from 'next/link';
import { Suspense } from 'react';
import OpenCart from './cart/open-cart';

export default async function Navbar() {
  return (
    <nav className='relative flex items-center justify-between p-4 lg:px-6'>
      <div className='flex w-full items-center'>
        <div className='flex w-full md:w-1/3'>
          <Link
            href='/'
            className='mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6'
          >
            LOGO
            <div className='ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block'>
              HAUWA
            </div>
          </Link>

          <ul className='hidden gap-6 text-sm md:flex md:items-center'>
            <li>
              <Link
                href={'/'}
                className='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className='hidden justify-center md:flex md:w-1/3'></div>
        <div className='flex justify-end md:w-1/3'>
          wsjhsjs
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
