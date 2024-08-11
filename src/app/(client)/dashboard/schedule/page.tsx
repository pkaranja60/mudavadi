"use client";

import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import renderScheduleCards from "./components/card";
import { getDriverSchedules } from "@/app/(backend)/graph/graph-queries";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import ScheduleForm from "./components/form";

export default function ScheduleTool() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

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
    <main>
      <div className="h-24 flex items-center justify-between">
        <div className="text-2xl font-bold capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>

        <Button
          className="bg-green-700 hover:bg-green-600 capitalize gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus />
          Schedule
        </Button>
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

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <ScheduleForm />
      </Modal>
    </main>
  );
}
