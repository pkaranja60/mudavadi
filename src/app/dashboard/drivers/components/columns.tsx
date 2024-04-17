"use client";

import { Button } from "@/components/ui/button";
import { DriverData } from "@/schema";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<DriverData>[] = [
  {
    accessorKey: "nationalId",
    header: "National ID",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Last Name
          <ArrowUpDown className="w-4 h-4 ml-3" />
        </Button>
      );
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
    cell: ({ row }) => {
      const licenseExpiration = row.getValue("licenseExpiration");
      const formatted = new Date(
        licenseExpiration as string
      ).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "driverStatus",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const driver = row.original;
      const driverId = driver.nationalId;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(driverId.toString());
              }}
            >
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
