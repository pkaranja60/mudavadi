"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DriverData } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2, SquarePen } from "lucide-react";

export const columns: ColumnDef<DriverData>[] = [
  {
    accessorKey: "nationalId",
    header: "National ID",
    enableHiding: false,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          Last Name
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <ArrowUpDown className="w-5 h-5" />
          </Button>
        </div>
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
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
        Status
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <ArrowUpDown className="w-5 h-5" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { driverStatus } = row.original;

      // Define the style based on the driverStatus value
      let style = {};
      switch (driverStatus) {
        case "active":
          style = {
            backgroundColor: "green",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        case "suspended":
          style = {
            backgroundColor: "yellow",
            color: "black",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        case "inactive":
          style = {
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        default:
          style = { padding: "5px" }; // Default style if none of the cases match
      }

      // Return the cell content with the appropriate style
      return <span style={style}>{driverStatus}</span>;
    },
  },
  {
    id: "schedule",
    header: "Schedule",
    enableHiding: false,
    cell: () => {
      return (
        <Button variant="outline">
        schedule
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between">
              Update
              <SquarePen className="w-4 h-4 text-blue-500" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              Delete
              <Trash2 className="w-4 h-4 text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
