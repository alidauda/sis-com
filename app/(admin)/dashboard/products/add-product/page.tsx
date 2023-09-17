'use client';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { uploadFiles } from '@/utils/uploadthing';
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  price: z.string().min(1, { message: 'Price must be at least 1 character' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters' }),
  quantity: z
    .string()
    .min(1, { message: 'Quantity must be at least 1 character' }),
});

interface ImageProps {
  url: string[];
  File: File[];
}
export default function AddProduct() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [image, setImage] = useState<ImageProps>();
  const [imageError, setImageError] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (image?.url.length === 0) {
      setImageError(true);
      return;
    }
    if (!image?.File) {
      return;
    }

    try {
      const file = await uploadFiles({
        files: image?.File,
        endpoint: 'imageUploader',
      });
      if (!file) return;
      const newProduct = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: file[0].url,
          imageKey: file[0].key,
          quantity: data.quantity,
        }),
      });
      if (!newProduct.ok) {
        return;
      }
      const response = await newProduct.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className=' bg-white p-5  shadow-lg flex justify-between'>
        <Link href='/dashboard/products'>
          <ArrowLeft />
        </Link>
        <Button type='button' onClick={form.handleSubmit(onSubmit)}>
          Add Product
        </Button>
      </div>
      <div className='p-4 m-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
        <div className='grid grid-cols-4 gap-4'>
          <div className=''>
            <div className='bg-white grid shadow-sm p-2  '>
              <Link href='#product-section'>
                <div className='p-3 border-b-2'>Product Section</div>
              </Link>
              <Link href='#image-section'>
                {' '}
                <div className='p-3 border-b-2'>Image Section</div>
              </Link>
              <Link href='#button'>
                {' '}
                <div className='p-3 border-b-2'>Add Button</div>
              </Link>
            </div>
          </div>
          <div className='col-span-3 grid gap-6'>
            <div
              className='bg-white shadow-md p-4 rounded-md'
              id='product-section'
            >
              <Form {...form}>
                <form className='space-y-8'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field, fieldState, formState }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder='product name' {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field, fieldState, formState }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder='price' {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='quantity'
                    render={({ field, fieldState, formState }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder='quantity' {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field, fieldState, formState }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='description'
                            className='resize-none h'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div
              className='bg-white p-4 shadow-md rounded-md grid grid-cols-4 gap-2 flex-wrap'
              id='image-section'
            >
              <div
                className={`p-2 ${imageError ? 'border-2 border-red-500' : ''}`}
              >
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    setImage((prev) => ({
                      ...prev,
                      url: acceptedFiles.map((file) =>
                        URL.createObjectURL(file)
                      ),
                      File: acceptedFiles,
                    }));
                    setImageError(false);
                  }}
                  accept={{
                    'image/jpeg': [],
                    'image/png': [],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps({})}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label
                          htmlFor='dropzone-file'
                          className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <svg
                              className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 20 16'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                              />
                            </svg>
                            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                              <span className='font-semibold'>
                                Click to upload
                              </span>{' '}
                              or drag and drop
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id='dropzone-file'
                            type='file'
                            className='hidden'
                            {...getInputProps()}
                          />
                        </label>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {imageError && (
                  <p className='text-red-600'>Please add at least one image</p>
                )}
              </div>
              {image?.url.map((img, i) => {
                return (
                  <div className='relative w-56 h-56 p-2' key={i}>
                    <Image
                      src={img}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-md'
                      alt='product image'
                    />
                  </div>
                );
              })}
            </div>
            <Button
              type='button'
              onClick={form.handleSubmit(onSubmit)}
              id='button'
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
