'use client';
import { Orders } from '@/utils/order';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
type Order = {
  id: string;
  name: string;
  price: string;
  quantity: string;
  status: string;
};
const columnHelper = createColumnHelper<Order>();

const columns = [columnHelper.accessor('id', {})];
export default function Orders() {
  const { data, isLoading } = useQuery(['orders'], {
    queryFn: getOrders,
  });
  console.log(data);
  return (
    <>ss</>
    // <div>
    //   <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
    //     <thead className='text-xs text-gray-950 uppercase bg-white dark:bg-gray-700 dark:text-gray-400'>
    //       <tr>
    //         <th scope='col' className='px-6 py-3'>
    //           <span className='sr-only'>Image</span>
    //         </th>
    //         <th scope='col' className='px-6 py-3'>
    //           Product
    //         </th>
    //         <th scope='col' className='px-6 py-3'>
    //           Qty
    //         </th>
    //         <th scope='col' className='px-6 py-3'>
    //           Price
    //         </th>
    //         <th scope='col' className='px-6 py-3'>
    //           Status
    //         </th>
    //         <th scope='col' className='px-6 py-3'>
    //           Action
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {isLoading ? (
    //         <SkeletonDemo />
    //       ) : !data?.orders?.OrderItems?.length ? (
    //         data?.orders?.OrderItems?.map((item) => (
    //           <TableRow key={item.productId} order={item} />
    //         ))
    //       ) : (
    //         <div className='text-center'>No data found</div>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
}
async function getOrders(): Promise<Orders> {
  const data = await fetch('/api/orders', {
    method: 'GET',
  });
  const orders = await data.json();
  return orders;
}
