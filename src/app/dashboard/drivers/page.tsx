"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns, Driver } from "./components/columns";
import DriverForm from "./components/driver-form";
import { useQuery } from "@tanstack/react-query";
import { getAllDrivers } from "@/backend/ApiConfig";

export default function DriverPage() {
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
      <main className="w-full">
        <div className="h-24 flex items-center px-14 text-2xl font-bold  capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-5 px-20 pt-6">
          <div className="col-span-5">
            {isLoading ? (
              "Loading..."
            ) : (
              <div>
                <DataTable columns={columns} data={drivers} /> 
              </div>
            )}
          </div>

          <div className="col-span-2">
            <DriverForm />
          </div>
        </div>
      </main>
    </>
  );
}
