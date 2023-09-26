import { ReactNode } from 'react';

export default function AdminStyleWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='p-2 m-2 '>
      <div className='  sm:rounded-lg bg-white'>{children}</div>
    </div>
  );
}
