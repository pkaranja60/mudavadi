"use client";

import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import renderScheduleCards from "./components/card";
import {
  automatedSchedule,
  getSchedules,
} from "@/app/(backend)/graph/graph-queries";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import ScheduleForm from "./components/form";
import {
  filterSchedulesByClass,
  generateMockTripData,
  scheduleDriversToVehicles,
  TripData,
} from "./utils/schedule";
import { toast } from "sonner";
import { sendSms } from "@/services/sms";
import { downloadToExcel } from "@/lib/xls";

export default function ScheduleTool() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getSchedules(),
    queryKey: ["schedules"],
  });

  async function handleExport() {
    try {
      // Get the initial schedule data
      const initialSchedule = await scheduleDriversToVehicles();

      // Generate mock trip data
      const mockTrips: TripData[] = generateMockTripData(initialSchedule, 15);

      // Export to Excel
      await downloadToExcel("/schedule", mockTrips);
    } catch (error) {
      console.error("Failed to export data:", error);
    }
  }

  const handleAutoSchedule = async () => {
    try {
      // Get the schedule data
      const scheduleData = await scheduleDriversToVehicles();

      // Ensure the schedule data is not empty
      if (scheduleData.length === 0) {
        toast.info("No schedules to create.");
        return;
      }

      // Handle the mutation for each schedule item
      scheduleData.map(async (item) => {
        try {
          // Call automatedSchedule for each item
          await automatedSchedule(item);
        } catch (error) {
          console.error("Error creating schedule for item:", item, error);
          toast.error(
            `Failed to create schedule for item ${item.slotNumber}.`,
            {
              duration: 5000,
            }
          );
          return null; // Continue processing other items
        }
      });

      // Show toast notification for success
      toast.success("Schedule created successfully!", {
        duration: 5000,
      });

      // Send SMS for each schedule item
      await Promise.all(
        scheduleData.map(async (item) => {
          await sendSms(item);
        })
      );
    } catch (error) {
      console.error("Error during scheduling:", error);
      toast.error("Failed to auto-schedule drivers.", {
        duration: 5000,
      });
    }
  };

  // Filter schedules based on vehicleClass
  const Matatus = filterSchedulesByClass(schedules || [], "matatu");
  const Minibuses = filterSchedulesByClass(schedules || [], "minibus");
  const Buses = filterSchedulesByClass(schedules || [], "bus");

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

        <div className="flex gap-5">
          <Button
            className="bg-cyan-700 hover:bg-cyan-600 capitalize gap-2"
            onClick={handleAutoSchedule}
          >
            Schedule
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-600 capitalize gap-2"
            onClick={handleExport}
          >
            Reports
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-2xl font-semibold">Matatu</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              {renderScheduleCards(
                Matatus,
                "w-[220px] h-[200px] p-5 flex-shrink-0 flex flex-col justify-center text-center bg-gradient-to-r from-cyan-100 to-blue-100 hover:scale-105 cursor-pointer"
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Minibus</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              {renderScheduleCards(
                Minibuses,
                "w-[220px] h-[200px] p-5 flex-shrink-0 flex flex-col justify-center text-center bg-gradient-to-r from-pink-100 to-blue-100 hover:scale-105 cursor-pointer"
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Bus</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              {renderScheduleCards(
                Buses,
                "w-[220px] h-[200px] p-5 flex-shrink-0 flex flex-col justify-center text-center bg-gradient-to-r from-violet-100 to-blue-100 hover:scale-105 cursor-pointer"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <ScheduleForm />
      </Modal> */}
    </main>
  );
}
