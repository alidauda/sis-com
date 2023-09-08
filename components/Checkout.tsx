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

export default function CardWithForm() {
  const mutation = useMutation({
    mutationFn: checkOut,
  });
  return (
    <div className='flex justify-center'>
      <Card className='w-[500px] '>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
              </div>
            </div>
            <div className='grid w-full items-center gap-4 p-3'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
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
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
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
            {mutation.isLoading ? '.....' : 'Checkout'}
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
