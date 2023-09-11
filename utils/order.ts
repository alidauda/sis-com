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
