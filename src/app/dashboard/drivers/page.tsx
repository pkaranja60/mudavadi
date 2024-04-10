"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns} from "./components/columns";
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

        <div className="flex flex-col lg:flex-row gap-5 px-10 lg:px-20">
          <div className="flex-1">
            {isLoading ? (
              "Loading..."
            ) : (
              <div>
                <DataTable columns={columns} data={drivers} /> 
              </div>
            )}
          </div>

          <div className="">
            <DriverForm />
          </div>
        </div>
      </main>
    </>
  );
}
