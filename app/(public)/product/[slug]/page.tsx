import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Link from 'next/link';
import { GridTileImage } from '@/components/GridTile';

import { Gallery } from '@/components/products/gallery';
import { ProductDescription } from '@/components/products/productDes';
import prisma from '@/utils/db';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,

    openGraph: product.Images[0].imageUrl
      ? {
          images: [
            {
              url: product.Images[0].imageUrl,
              width: 100,
              height: 100,
              alt: product.name,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getProduct(params.slug);

  if (!data) return notFound();
  const product = {
    ...data,
    quantity: data.quantity.toString(),
  };
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.Images[0].imageUrl,
    offers: {
      '@type': 'AggregateOffer',
      availability: true
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'NGN',
      highPrice: product.price,
      lowPrice: product.price,
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className='mx-auto max-w-screen-2xl px-4'>
        <div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8'>
          <div className='h-full w-full basis-full lg:basis-4/6'>
            <Gallery
              images={{
                src: product.Images[0].imageUrl,
                altText: product.name,
              }}
            />
          </div>

          <div className='basis-full lg:basis-2/6'>
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
async function getProduct(id: string) {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    include: {
      Images: true,
    },
  });
  return product;
}
