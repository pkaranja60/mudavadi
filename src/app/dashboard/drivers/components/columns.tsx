"use client";

import { DriverTableSchema } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = z.infer<typeof DriverTableSchema>;

export const columns: ColumnDef<Driver>[] = [
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
  {
    accessorKey: "status",
    header: "Status",
  },
];
