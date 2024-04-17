"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import VehicleForm from "./components/vehicle-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VehicleListPage() {
  const pathname = usePathname();
  return (
    <>
      <main className="w-full h-full px-14">
        <div className="h-28 flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">
            <h1>{pathname.slice(1)}</h1>
          </div>

          <Link href="/dashboard/vehicles/create_vehicle">
            <Button className="bg-green-700 hover:bg-green-600 capitalize">
              Create new vehicle
            </Button>
          </Link>
        </div>

        {/* <DataTable columns={columns} data={} /> */}
      </main>
    </>
  );
}
