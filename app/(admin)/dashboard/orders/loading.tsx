import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonDemo() {
  return (
    <>
      <tr className='p-4'>
        <td colSpan={5} className=' '>
          {' '}
          <Skeleton className='h-28 w-full' />
        </td>
      </tr>
      <tr className='p-4'>
        <td colSpan={5} className=' '>
          {' '}
          <Skeleton className='h-28 w-full' />
        </td>
      </tr>
      <tr className='p-4'>
        <td colSpan={5} className=' '>
          {' '}
          <Skeleton className='h-28 w-full' />
        </td>
      </tr>
      <tr className='p-4'>
        <td colSpan={5} className=' '>
          {' '}
          <Skeleton className='h-28 w-full' />
        </td>
      </tr>
    </>
  );
}
