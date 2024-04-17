"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import DriverForm from "./components/driver-form";
import { useQuery } from "@tanstack/react-query";
import { getAllDrivers } from "@/backend/ApiConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DriverListPage() {
  const pathname = usePathname();
  const {
    data: drivers,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllDrivers(),
    queryKey: ["drivers"],
  });

  return (
    <>
      <main className="w-full h-full px-14">
        <div className="h-28 flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">
            <h1>{pathname.slice(1)}</h1>
          </div>

          <Link href="/dashboard/drivers/create_driver">
            <Button className="bg-green-700 hover:bg-green-600 capitalize">Create new driver</Button>
          </Link>
        </div>

        <div>
          {isLoading ? (
            "Loading..."
          ) : (
            <div>
              <DataTable columns={columns} data={drivers} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
