'use client';
import { Orders } from '@/utils/order';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import AdminStyleWrapper from '@/components/AdminStyleWrapper';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
type Order = {
  id: string;
  name: string;
  price: string;
  quantity: string;
  status: string;
};

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor(
    (row) => {
      return <>{'#00' + row.id}</>;
    },
    {
      id: 'id',
      header: 'Ordernumber',
      cell: (value) => value.getValue(),
    }
  ),
  columnHelper.accessor('name', {
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('price', {
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('quantity', {
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('status', {
    cell: (value) => value.getValue(),
  }),
];
export default function Orders() {
  const { data, isLoading } = useQuery(['orders'], {
    queryFn: getOrders,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: data?.orders?.map((item) => {
      return {
        id: item.id,
        name: item.name,

        price: item.totalAmount.toString(),
        quantity: item.totalQuantity.toString(),
        status: item.status,
      };
    }) as Order[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  console.log();
  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('id')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      {isLoading ? (
        'loading'
      ) : (
        <AdminStyleWrapper>
          <div className='rounded-md border shadow-md'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AdminStyleWrapper>
      )}
    </div>
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
