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
          src={item.Images[0].imageUrl}
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
  const newList = items.map((item) => {
    return {
      ...item,
      quantity: item.quantity.toString(),
    };
  });
  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
      {newList.map((items, i) => (
        <ThreeItemGridItem
          size='half'
          item={items}
          priority={true}
          key={items.id}
        />
      ))}
    </section>
  );
}

async function getProduct() {
  try {
    const product = await prisma.product.findMany({
      include: {
        Images: true,
      },
    });

    return product;
  } catch (err) {
    return;
  }
}
