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
import { useState } from 'react';

import { utapi } from 'uploadthing/server';
import { QueryClient, useMutation } from '@tanstack/react-query';

type Inputs = {
  name: string;
  price: string;
  description: string;

  quantity: string;
};
const queryClient = new QueryClient();
export default function AddProductModal() {
  const [imageUrl, setImageUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
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
          image: imageUrl,
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
            onClick={(_) => {
              setImageUrl('');
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
              setImageUrl(file[0].url);
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
