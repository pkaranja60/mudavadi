"use client";


import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import renderScheduleCards from "./components/card";
import { getDriverSchedules } from "@/app/(backend)/graph/graph-queries";

export default function ScheduleTool() {
  const pathname = usePathname();

  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getDriverSchedules(),
    queryKey: ["schedules"],
  });

  // Filter schedules based on vehicleClass
  const Matatus = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "Matatu"
  );
  const Minibuses = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "Minibus"
  );
  const Buses = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "Bus"
  );

  if (isLoading) {
    return (
      <div>
        <Loader loading={isLoading} />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching schedules: {isError}</div>;
  }

  return (
    <main className="w-full px-14">
      <div className="h-24 flex items-center justify-between">
        <div className="text-2xl font-bold capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-2xl font-semibold">Matatu</h3>

          {renderScheduleCards(
            Matatus,
            "w-[220px] h-[200px] p-5 flex flex-col justify-center text-center bg-gradient-to-r from-cyan-100 to-blue-100 hover:scale-105 cursor-pointer"
          )}
        </div>
        <div>
          <h3 className="text-2xl font-semibold ">Minibus</h3>

          {renderScheduleCards(
            Minibuses,
            "w-[220px] h-[200px] p-5 flex flex-col justify-center text-center bg-gradient-to-r from-pink-100 to-blue-100 hover:scale-105 cursor-pointer"
          )}
        </div>
        <div>
          <h3 className="text-2xl font-semibold ">Bus</h3>
          {renderScheduleCards(
            Buses,
            "w-[220px] h-[200px] p-5 flex flex-col justify-center text-center bg-gradient-to-r from-violet-100 to-blue-100 hover:scale-105 cursor-pointer"
          )}
        </div>
      </div>
    </main>
  );
}
