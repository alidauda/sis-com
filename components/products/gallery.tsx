'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { GridTileImage } from '../GridTile';
import { MoveLeft, MoveRight } from 'lucide-react';
import { createUrl } from '@/utils/db';

export function Gallery({
  images,
}: {
  images: { src: string; altText: string };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());

  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());

  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
        {images && (
          <Image
            className='h-full w-full object-contain'
            fill
            sizes='(min-width: 1024px) 66vw, 100vw'
            alt={images?.altText as string}
            src={images?.src as string}
            priority={true}
          />
        )}
      </div>
    </>
  );
}
