"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VehicleData } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "vehicleReg",
    header: "vehicle Registration",
    enableHiding: false,
  },
  {
    accessorKey: "insuranceExpiration",
    header: "insurance Expiration",
  },
  {
    accessorKey: "vehicleStatus",
    header: "Status",
  },

  {
    accessorKey: "vehicleClass",
    header: "Vehicle Class",
  },
  {
    id: "actions",
    header: "Management",
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
