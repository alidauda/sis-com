'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/product';
import ProductTable from '@/components/Product';

import Link from 'next/link';

export default function AddProduct() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['listofproducts'],
    queryFn: getProduct,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isFetching) {
    return <div>fetching...</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  console.log(data);
  return (
    <main className='bg-gray-200'>
      <div className=' bg-white p-5  shadow-lg flex justify-between'>
        <Link href='/dashboard/products'>Product</Link>
      </div>
      <div className='flex justify-end px-4 mx-4  py-2'>
        <Link href='/dashboard/products/add-product'>
          <div className=' border-2 p-3 rounded-lg shadow-md hover:bg-blue-500 bg-blue-600 text-white'>
            Add Product
          </div>
        </Link>
      </div>
      <div className='p-2 m-2 '>
        <div className='  sm:rounded-lg bg-white'>
          <ProductTable props={data!} />
        </div>
      </div>
    </main>
  );
}
