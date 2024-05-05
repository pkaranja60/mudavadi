"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { getAllVehicles } from "@/backend/ApiConfig";
import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";

export default function VehicleListPage() {
  const pathname = usePathname();

  const { data: vehicles, isLoading } = useQuery({
    queryFn: () => getAllVehicles(),
    queryKey: ["vehicles"],
  });
  return (
    <main className="w-full px-14">
      <div className="h-28 flex items-center justify-between">
        <div className="text-2xl font-bold capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>

      </div>

      <div>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <div>
            <DataTable columns={columns} data={vehicles ?? []} />
          </div>
        )}
      </div>
    </main>
  );
}
