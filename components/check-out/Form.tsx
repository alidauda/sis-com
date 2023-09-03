'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

type FormValues = {
  first_name: string;
  last_name: string;
  city: string;
  country_code: string;
  postal_code: string;
  province?: string;
  address_1: string;
  address_2?: string;
  phone?: string;
  company?: string;
};

const AddAddress: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  return (
    <>
      <div className='grid grid-cols-1 gap-y-2 bg-white p-6 '>
        <div className='grid grid-cols-2 gap-x-2'>
          <Input
            label='first name'
            {...register('first_name', {
              required: 'First name is required',
            })}
            required
            autoComplete='given-name'
            placeholder='First name'
          />
          <Input
            label='Last name'
            {...register('last_name', {
              required: 'Last name is required',
            })}
            required
            autoComplete='family-name'
          />
        </div>
        <Input label='Company' {...register('company')} />
        <Input
          label='Address'
          {...register('address_1', {
            required: 'Address is required',
          })}
          required
          autoComplete='address-line1'
        />
        <Input
          label='Apartment, suite, etc.'
          {...register('address_2')}
          autoComplete='address-line2'
        />
        <div className='grid grid-cols-[144px_1fr] gap-x-2'>
          <Input
            label='Postal code'
            {...register('postal_code', {
              required: 'Postal code is required',
            })}
            required
            autoComplete='postal-code'
          />
          <Input
            label='City'
            {...register('city', {
              required: 'City is required',
            })}
            required
            autoComplete='locality'
          />
        </div>
        <Input
          label='Province / State'
          {...register('province')}
          autoComplete='address-level1'
        />

        <Input label='Phone' {...register('phone')} autoComplete='phone' />
      </div>
      {error && (
        <div className='text-rose-500 text-small-regular py-2'>{error}</div>
      )}
    </>
  );
};

export default AddAddress;
