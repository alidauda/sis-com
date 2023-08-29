import { Product } from '@/utils/product';
import Link from 'next/link';
import { GridTileImage } from './GridTile';
import { prisma } from '@/utils/auth';

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
      <Link className='relative block aspect-square h-full w-full' href={`#`}>
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
  const homepageItems = await getProduct();

  if (!homepageItems[0]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
      <ThreeItemGridItem size='full' item={firstProduct} priority={true} />
      <ThreeItemGridItem size='half' item={secondProduct} priority={true} />
      <ThreeItemGridItem size='half' item={thirdProduct} />
    </section>
  );
}

async function getProduct() {
  const product = await prisma.product.findMany({});
  return product;
}
