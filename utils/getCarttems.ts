import prisma from './db';

export async function getCarItems(id: string) {
  let quantity = 0;
  let total = 0;

  const items = await prisma.cartItem.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      product: {
        select: {
          name: true,
          price: true,
          Images: {
            select: {
              imageUrl: true,
            },
          },
          description: true,
          id: true,
        },
      },
      quantity: true,
    },
  });
  for (let i of items) {
    const sum = parseInt(i.product.price) * i.quantity;
    quantity += i.quantity;
    total += sum;
  }

  return {
    items,
    total,
    quantity,
  };
}
