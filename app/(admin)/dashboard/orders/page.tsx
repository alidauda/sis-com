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
import { Button } from '@/components/ui/button';
import { StatusState } from '@/components/Status';
import Link from 'next/link';
type Order = {
  orderNumber: string;
  name: string;
  price: string;
  quantity: string;
  status: string;
  date: string;
};

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor(
    (row) => {
      return (
        <Link
          href={`/dashboard/orders/${row.orderNumber}`}
          className='underline text-blue-500  text-lg'
        >
          {'#00' + row.orderNumber}
        </Link>
      );
    },
    {
      header: 'Ordernumber',
      cell: (value) => value.getValue(),
    }
  ),
  columnHelper.accessor('date', {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const newDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
      return <div className='text-lg'>{newDate}</div>;
    },
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: ({ row }) => <div className='text-lg'>{row.getValue('name')}</div>,
  }),
  columnHelper.accessor(
    (row) => {
      return (
        <>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            currencyDisplay: 'narrowSymbol',
          }).format(parseInt(row.price))}
        </>
      );
    },
    {
      id: 'price',
      cell: (value) => <div className='text-lg'>{value.getValue()}</div>,
    }
  ),
  columnHelper.accessor('quantity', {
    cell: (value) => <div className='text-lg'>{value.getValue()}</div>,
  }),
  columnHelper.accessor('status', {
    cell: (value) => {
      const status = value.getValue();
      return <div className='text-lg'>{StatusState(status)}</div>;
    },
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
        orderNumber: item.id,
        name: item.name,

        price: item.totalAmount.toString(),
        quantity: item.totalQuantity.toString(),
        status: item.status,
        date: item.updatedAt,
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
    <div className=''>
      <div className='flex items-center py-4'></div>
      {isLoading ? (
        'loading'
      ) : (
        <AdminStyleWrapper>
          <div className='w-full p-4 '>
            <div className='flex items-center py-4'>
              <Input
                placeholder='Filter order'
                defaultValue={
                  (table
                    .getColumn('Ordernumber')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('Ordernumber')
                    ?.setFilterValue(event.target.value)
                }
                className='max-w-sm'
              />
            </div>
            <div className='rounded-md border'>
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
            <div className='flex items-center justify-end space-x-2 py-4'>
              <div className='flex-1 text-sm text-muted-foreground'>
                {table.getPageCount()}
              </div>
              <div className='space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
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
