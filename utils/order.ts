export type Orders = {
  orders: {
    id: string;
    userId: string;
    totalAmount: number;
    totalQuantity: number;
    status: string;
    OrderItems: [
      {
        id: string;
        quantity: number;
        productId: string;

        product: {
          id: string;
          name: string;
          price: number;
          description: string;
          image: string;
        };
      }
    ];
  };
};
let n = ' ';
for (let i = 0; i <= 8; i++) {
  for (let j = 0; j <= 8; j++) {
    if (j % 2 == 0) {
      n += '#';
    } else {
      n += ' ';
    }
  }
  console.log((n += '\n'));
}
