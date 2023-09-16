'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { use, useState } from 'react';

import { utapi } from 'uploadthing/server';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

type Inputs = {
  name: string;
  price: string;
  description: string;

  quantity: string;
};

export default function AddProductModal() {
  const [imageUrl, setImageUrl] = useState({ url: '', key: '' });
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (
        productName.trim().length === 0 &&
        description.trim().length === 0 &&
        price.trim().length === 0 &&
        quantity.trim().length === 0
      ) {
        return;
      }
      const data = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: productName,
          price: price,
          description: description,
          imageUrl: imageUrl.url,
          imageKey: imageUrl.key,
          quantity: quantity,
        }),
      });
      const product = await data.json();
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listofproducts'] });
    },
  });

  const addProduct = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex justify-end m-2'>
          <Button
            variant='outline'
            onClick={async (_) => {
              setImageUrl({ url: '', key: '' });
            }}
          >
            Add Product
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Input
            id='name'
            placeholder='product name'
            className='col-span-3'
            onChange={(e) => setProductName(e.target.value)}
          />

          <Input
            id='description'
            type='text'
            placeholder='dscription'
            className='col-span-3'
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            id='quantity'
            placeholder='quantity'
            className='col-span-3'
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            id='price'
            placeholder='price'
            className='col-span-3'
            onChange={(e) => setPrice(e.target.value)}
          />

          <UploadDropzone
            endpoint='imageUploader'
            className='col-span-3'
            onClientUploadComplete={async (file) => {
              if (!file) return;
              setImageUrl({ url: file[0].url, key: file[0].key });
            }}
          />
        </div>
        <DialogFooter>
          <Button type='button' onClick={() => mutate()}>
            {isLoading ? 'loading' : 'add product'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
