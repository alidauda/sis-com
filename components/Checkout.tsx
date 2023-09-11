import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';

export default function CardWithForm({
  cartItems,
}: {
  cartItems:
    | {
        items: {
          quantity: number;
          product: {
            id: string;
            quantity: number;
            name: string;
            price: number;
            description: string;
            image: string;
          };
        }[];
        total: number;
        quantity: number;
      }
    | undefined;
}) {
  const mutation = useMutation({
    mutationFn: async () => {
      const order = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: cartItems?.items,
          totalAmount: cartItems?.total,
          totalQuantity: cartItems?.quantity,
        }),
      });
      const data = await order.json();
      return data;
    },
  });
  return (
    <div className='flex justify-center'>
      <Card className='w-[500px] '>
        <CardHeader>
          <CardTitle className='text-center'>Details</CardTitle>
          <CardDescription className='text-center'>
            please fill in the delivery details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='name' />
              </div>
            </div>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='Address'>Address</Label>
                <Input id='Address' placeholder='Address' />
              </div>
            </div>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Phone Number</Label>
                <Input id='name' placeholder='Phone Number' />
              </div>
            </div>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>State</Label>
                <Input id='State' placeholder='State' />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            type='button'
            onClick={(e) => {
              mutation.mutate();
            }}
          >
            {mutation.isLoading ? '.....' : `${cartItems?.total}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
async function checkOut() {
  const addItems = await fetch('api/orders', {
    method: 'POST',
  });
  const data = await addItems.json();
  return data;
}
