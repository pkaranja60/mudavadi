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
import { MoreHorizontal, SquarePen } from "lucide-react";

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "vehicleReg",
    header: "vehicle Reg",
    enableHiding: false,
  },
  {
    accessorKey: "insuranceExpiration",
    header: "insurance Expiration",
  },
  {
    accessorKey: "vehicleClass",
    header: "Vehicle Class",
  },
  {
    id: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.driver;
      return <span>{`${firstName} ${lastName}`}</span>;
    },
  },
  {
    accessorKey: "driver.nationalId",
    header: "National ID",
  },
  {
    header: "Driver Status",
    id: "driver",
    cell: ({ row }) => {
      const { driverStatus } = row.original.driver;

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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
