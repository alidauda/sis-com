'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/product';
import ProductTable from '@/components/Product';
import AddProductModal from '@/components/AddproudctModal';

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
    <main>
      <AddProductModal />
      <div className='relative overflow-x-auto  sm:rounded-lg'>
        <ProductTable props={data!} />
      </div>
    </main>
  );
}
