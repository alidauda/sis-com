'use client';
import { UploadDropzone } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/utils/product';
import ProductTable from '@/components/Product';

export default function AddProduct() {
  const { data, isLoading } = useQuery({
    queryKey: ['adminProduct'],
    queryFn: getProduct,
  });
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  console.log(data);
  return (
    <main>
      <div className='relative overflow-x-auto  sm:rounded-lg'>
        <ProductTable props={data!} />
      </div>
      <UploadDropzone
        endpoint='imageUploader'
        onClientUploadComplete={async (file) => {
          if (!file) return;
          const product = await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'test',
              price: 200,
              image: file[0].url,
              quantity: 1,
              description: 'test',
            }),
          });
        }}
      />
    </main>
  );
}
