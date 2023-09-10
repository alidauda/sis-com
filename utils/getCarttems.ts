import prisma from './db';

export async function getCarItems(id: string) {
  let quantity = 0;
  let total = 0;

  const items = await prisma.cartItem.findMany({
    where: {
      userId: id,
    },
    select: {
      product: {
        select: {
          name: true,
          price: true,
          image: true,
          description: true,
          id: true,
          quantity: true,
        },
      },
      quantity: true,
    },
  });
  for (let i of items) {
    const sum = i.product.price * i.quantity;
    quantity += i.quantity;
    total += sum;
  }
  return {
    items,
    total,
    quantity,
  };
}
