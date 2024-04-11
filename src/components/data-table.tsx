"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>([])
  const [sorting, setSorting] = React.useState<SortingState>([]) // confirm whether it is a curly bracket or normal bracket
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFilterChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    }
  });

  return (
    <>
    <div className='flex items-center py-4'>
      <Input className='max-w-sm' placeholder='Filter by National Id' value={table.getColumn('nationalId')?.getFilterValue() as string || ''} onChange={e => { table.getColumn('nationalId')?.setFilterValue(e.target.value)}} />
    
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='ml-auto'>
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
{table.getAllColumns().filter(column =>column.getCanHide()).map(column =>{
  return(
    <DropdownMenuCheckBoxItem key={column.id} className='capitalize' checked={column.getVisible()} onCheckedChange={(value: boolean) =>{
      column.toggleVisibility(!!value);
    }}>
      {column.id}
    </DropdownMenuCheckBoxItem>
  )
})}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    </div>
      <div className="rounded-md border">
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
                  data-state={row.getIsSelected() && "selected"}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-3 py-2.5">
        <button className='p-2 text-sm rounded border' onClick={() => table.previousPage()}>Previous</button>
        <button className='p-2 text-sm rounded border' onClick={() => table.nextPage()}>Next</button>
      </div>
    </>
  );
}
