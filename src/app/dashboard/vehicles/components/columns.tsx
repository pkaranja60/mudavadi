"use client";

import { VehicleData } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<VehicleData>[] = [
  {
    accessorKey: "vehicleReg",
    header: "vehicle Registration",
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
];
