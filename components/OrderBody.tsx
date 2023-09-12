import { Orders } from '@/utils/order';

export default function TableRow({
  order,
}: {
  order: {
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
  };
}) {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <td className='w-32 p-4'>
        <img src={order.product.image} alt={order.product.name} />
      </td>
      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
        {order.product.name}
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center space-x-3'>{order.quantity}</div>
      </td>
      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
        {order.product.price}
      </td>
      <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'></td>
      <td className='px-6 py-4'>
        <a
          href='#'
          className='font-medium text-red-600 dark:text-red-500 hover:underline'
        >
          Remove
        </a>
      </td>
    </tr>
  );
}
