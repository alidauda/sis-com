import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import MyToggle from './Switch';
import Link from 'next/link';
import View from './View';
type ProductProps = {
  id: string;
  name: string;
  price: string;
  inStock: boolean;
  Images: {
    imageUrl: string;
  }[];
  quantity: string;
  description: string;
};
const columnHelper = createColumnHelper<ProductProps>();
const columns = [
  columnHelper.accessor(
    (row) => (
      <div className='flex items-center px-1 py-2 text-gray-900 whitespace-nowrap dark:text-white'>
        <Image
          height={60}
          width={60}
          src={row.Images[0].imageUrl}
          alt='Jese image'
        />
        <div className='pl-3'>
          <Link href='#'>
            <div className='text-base font-semibold text-blue-300'>
              {row.name}
            </div>
          </Link>
        </div>
      </div>
    ),

    {
      id: 'name',
      header: 'Product',
      cell: (value) => value.getValue(),
    }
  ),
  columnHelper.accessor('price', {
    cell: (value) => (
      <div className='text-base font-semibold'>
        {Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'NGN',
          currencyDisplay: 'narrowSymbol',
        }).format(parseInt(value.getValue()))}
      </div>
    ),
  }),
  columnHelper.accessor(
    (row) => (
      <div className='flex gap-3'>
        <MyToggle status={row.inStock} />
        <div className='text-base font-semibold text-green-400'>
          {'in stock: ' +
            Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: 'NGN',
              currencyDisplay: 'narrowSymbol',
            }).format(parseInt(row.price))}
        </div>
      </div>
    ),
    {
      id: 'stock',
      header: 'Stock',
      cell: (info) => info.getValue(),
    }
  ),
  columnHelper.accessor('quantity', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor(() => <div>View</div>, {
    id: 'actions',
    header: 'Actions',
    cell: (info) => info.getValue(),
  }),
];
export default function ProductTable({ props }: { props: ProductProps[] }) {
  const table = useReactTable({
    data: props,
    columns,

    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className=' text-lg text-left m-3 dark:text-gray-400 w-full p-3'>
      <thead className=''>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='p-4'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
