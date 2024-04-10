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
    header: "Last Name",
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
  },
  {
    accessorKey: "driverStatus",
    header: "Status",
  },
];
