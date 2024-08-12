"use client";

import { deleteVehicle } from "@/app/(backend)/graph/graph-queries";
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
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

const handleDeleteVehicle = async (id: string) => {
  try {
    await deleteVehicle(id);

    toast.success("Vehicle deleted successfully", {
      duration: 5000,
    });
  } catch (error) {
    toast.error("Vehicle not deleted", {
      duration: 5000,
    });
  }
};

function handleDeleteVehicleConfirmation(id: string) {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this driver?"
  );
  if (isConfirmed) {
    handleDeleteVehicle(id); // Proceed with deletion
  }
}

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "vehicleReg",
    header: "vehicle Reg",
    enableHiding: false,
  },
  {
    accessorKey: "insuranceExpiration",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center gap-1">
          Insurance Expiration
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
      const insuranceExpiration = row.getValue("insuranceExpiration");
      const formatted = new Date(
        insuranceExpiration as string
      ).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "vehicleClass",
    header: "Vehicle Type",
  },

  {
    header: "Status",
    id: "vehicleStatus",
    cell: ({ row }) => {
      const { vehicleStatus } = row.original;

      // Define the style based on the driverStatus value
      let style = {};
      switch (vehicleStatus) {
        case "active":
          style = {
            backgroundColor: "green",
            color: "white",
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
      return <span style={style}>{vehicleStatus}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Id = row.original.id;

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
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => Id && handleDeleteVehicleConfirmation(Id)}
            >
              Delete
              <Trash2 className="w-4 h-4 text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
