"use client";

import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import renderScheduleCards from "./components/card";
import {
  automatedSchedule,
  getSchedules,
} from "@/app/(backend)/graph/graph-queries";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/modal";
import ScheduleForm from "./components/form";
import { scheduleDriversToVehicles } from "./components/schedule";
import { ScheduleData } from "@/schema";
import { toast } from "sonner";

export default function ScheduleTool() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  function ensurePlusSign(phoneNumber?: string): string {
    if (!phoneNumber) {
      return ""; // Or handle the case where phoneNumber is missing
    }
    return phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
  }

  const sendSms = async (scheduleData: ScheduleData) => {
    const phoneNumber = scheduleData.phoneNumber;
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: ensurePlusSign(phoneNumber), // Ensure the phone number has a plus sign
          message: `You are scheduled to drive vehicle ${
            scheduleData.vehicleReg
          } is scheduled for slot ${scheduleData.slotNumber} on ${new Date(
            scheduleData.scheduledTime
          ).toLocaleDateString()} at ${new Date(
            scheduleData.scheduledTime
          ).toLocaleTimeString()}.`, // Properly formatted message
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send SMS");
      }

      toast.success("SMS sent successfully", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Error sending SMS:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

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

  const {
    data: schedules,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getSchedules(),
    queryKey: ["schedules"],
  });

  // Filter schedules based on vehicleClass
  const Matatus = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "matatu"
  );
  const Minibuses = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "minibus"
  );
  const Buses = schedules?.filter(
    (schedule) => schedule.vehicle.vehicleClass === "bus"
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

        <div className="flex items-center gap-5">
          <Button
            className="bg-cyan-700 hover:bg-cyan-600 capitalize gap-2"
            onClick={handleAutoSchedule}
          >
            Auto Schedule
          </Button>
          <Button
            className="bg-green-700 hover:bg-green-600 capitalize gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            Schedule
          </Button>
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

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <ScheduleForm />
      </Modal>
    </main>
  );
}
