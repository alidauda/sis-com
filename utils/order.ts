export type Orders = {
  id: number;
  userId: string;
  totalAmount: number;
  totalQuantity: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
  name: string;
  createdAt: Date;
  updatedAt: Date;
}[];

export type GetOneOrder = {
  order: {
    id: string;
    userId: string;
    totalAmount: number;
    totalQuantity: number;
    status: string;
    name: string;
    createdAt: string;
    address: string;
    city: string;
    country: string;

    email: string;

    phoneNumber: string;
    reference: string;
    state: string;

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
          Images: {
            imageUrl: string;
          }[];
        };
      }
    ];
  };
};
