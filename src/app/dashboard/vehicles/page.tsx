"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns, Payment } from "./components/columns";
import VehicleForm from "./components/vehicle-form";

export default function VehiclePage() {
  const pathname = usePathname();
  return (
    <main className="w-full">
      <div className="h-24 flex items-center px-14 text-2xl font-bold  capitalize">
        <h1>{pathname.slice(1)}</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-5 px-20 pt-6">
        <div className="col-span-5">
          {/* <DataTable columns={columns} data={} /> */}
        </div>

        <div className="col-span-2">
          <VehicleForm />
        </div>
      </div>
    </main>
  );
}
