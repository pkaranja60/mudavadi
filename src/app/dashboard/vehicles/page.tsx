"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns} from "./components/columns";
import VehicleForm from "./components/vehicle-form";

export default function VehiclePage() {
  const pathname = usePathname();
  return (
    <main className="w-full">
      <div className="h-24 flex items-center px-14 text-2xl font-bold  capitalize">
        <h1>{pathname.slice(1)}</h1>
      </div>

      <div className="grid grid-cols-4 gap-5 px-5 lg:px-20">
        <div className="cols-span-3">
          {/* <DataTable columns={columns} data={} /> */}
          <VehicleForm />
        </div>

        <div className="cols-span-1">
          <VehicleForm />
        </div>
      </div>
    </main>
  );
}
