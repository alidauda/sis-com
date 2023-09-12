import { Product } from '@/utils/product';
import Link from 'next/link';
import { GridTileImage } from './GridTile';
import prisma from '@/utils/db';

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  console.log(item);
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className='relative block aspect-square h-full w-full'
        href={`product/${item.id}`}
      >
        <GridTileImage
          src={item.image}
          fill
          sizes={
            size === 'full'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.price.toString(),
            currencyCode: '$',
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const items = await getProduct();
  if (!items?.length) return;
  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
      <ThreeItemGridItem size='full' item={items[0]} priority={true} />
      <ThreeItemGridItem size='half' item={items[1]} priority={true} />
      <ThreeItemGridItem size='half' item={items[1]} />
    </section>
  );
}

async function getProduct() {
  try {
    const product = await prisma.product.findMany({});
    console.log(product);
    return product;
  } catch (err) {
    return;
  }
}
