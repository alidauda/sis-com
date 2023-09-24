import { useMutation } from '@tanstack/react-query';
type Order = {
  items: {
    quantity: number;
    id: string;
    product: {
      id: string;
      name: string;
      price: string;
      description: string;
      Images: {
        imageUrl: string;
      }[];
    };
  }[];
  total: number;
  quantity: number;
};
export const useAddOrderHook = ({ order }: { order: Order | undefined }) => {
  return useMutation({
    mutationFn: async ({
      full_name,
      address,
      city,
      country,
      email,
      phoneNumber,
      reference,
      state,
      payemnt_status,
    }: {
      full_name: string;
      email: string;
      phoneNumber: string;
      address: string;
      city: string;
      state: string;
      country: string;
      reference: string;
      payemnt_status: string;
    }) => {
      const resp = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: order?.items,
          totalAmount: order?.total,
          totalQuantity: order?.quantity,
          full_name,
          email,
          phoneNumber,
          address,
          city,
          state,
          country,
          reference,
          payemnt_status,
        }),
      });
      const data = await resp.json();
      return data;
    },
  });
};
