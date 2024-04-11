"use client";

import { DriverData } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DriverData>[] = [
  {
    accessorKey: "nationalId",
    header: "National ID",
  },
  {
    accessorKey: "lastName",
    header: ({header})=>{
      <Button variant='ghost' onClick={
        ()=>{
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
      }>
        Last Name
        <ArrowUpDown className='w-4 h-4 ml-3' />
      </Button>
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "licenseExpiration",
    header: "License Expiration",
    cell: ({row})=>{
      const licenseExpiration = row.getValue('licenseExpiration');
      const formatted = new Date(licenseExpiration as string).toLocaleDateString();
      return <div>{formatted}</div>
    }
  },
  {
    accessorKey: "driverStatus",
    header: "Status",
  },
  {
    id: 'actions',
    cell: ({row})=>{
      return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-8 h-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    }
  }
];
