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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  price: string;
  description: string;

  quantity: string;
};

export default function AddProductModal() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const [imageUrl, setImageUrl] = useState('');
  const submit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex justify-end m-2'>
          <Button variant='outline' onClick={(_) => setImageUrl('')}>
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
            {...(register('name'), { required: true, minLength: 2 })}
          />

          <Input
            id='description'
            type='text'
            placeholder='dscription'
            className='col-span-3'
            {...register('description')}
          />
          <Input
            id='quantity'
            placeholder='quantity'
            className='col-span-3'
            {...(register('quantity'), { required: true })}
          />
          <Input
            id='price'
            placeholder='price'
            className='col-span-3'
            {...(register('price'), { required: true })}
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
          <Button type='submit' onSubmit={handleSubmit(submit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
