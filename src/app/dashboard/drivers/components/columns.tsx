"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
  id: string;
  amount: number;
  status: "Active" | "Suspended" | "Inactive";
  email: string;
};

export const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "driver",
    header: "Driver Name",
  },
  {
    accessorKey: "phone",
    header: "PhoneNo",
  },
  {
    accessorKey: "license",
    header: "LicenseNo",
  },
  {
    accessorKey: "licenseExpiration",
    header: "License Expiration",
  },
];
