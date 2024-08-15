import {
  getAllDrivers,
  getAllVehicles,
} from "@/app/(backend)/graph/graph-queries";
import { DriverScheduleData } from "@/schema";
import { toast } from "sonner";

/**
 * Filters an array of driver schedule data to only include schedules for vehicles with the specified vehicle class.
 *
 * @param schedules - An array of driver schedule data.
 * @param vehicleClass - The vehicle class to filter the schedules by.
 * @returns An array of driver schedule data that match the specified vehicle class.
 */
export function filterSchedulesByClass(
  schedules: DriverScheduleData[],
  vehicleClass: string
): DriverScheduleData[] {
  return (
    schedules?.filter(
      (schedule) => schedule.vehicle.vehicleClass === vehicleClass
    ) || []
  );
}

/**
 * Maintains a map of driver assignments, where the key is the driver ID and the value is an object containing the last assigned slot number and the last assigned time.
 */
const driverAssignments: Map<string, { lastSlot: number; lastTime: Date }> =
  new Map();

/**
 * Retrieves a list of active drivers that have the specified license classes.
 *
 * @param licenseClasses - An array of license class strings to filter the drivers by.
 * @returns A Promise that resolves to an array of active drivers with the specified license classes.
 */
const getActiveDriversByClass = async (licenseClasses: string[]) => {
  try {
    const drivers = await getAllDrivers();
    return drivers.filter(
      (driver) =>
        driver.driverStatus === "active" &&
        licenseClasses.includes(driver.licenseClass)
    );
  } catch (error) {
    console.error("Error fetching active drivers:", error);
    return [];
  }
};

/**
 * Retrieves a list of active vehicles that have the specified vehicle classes.
 *
 * @param vehicleClasses - An array of vehicle class strings to filter the vehicles by.
 * @returns A Promise that resolves to an array of active vehicles with the specified vehicle classes.
 */
const getActiveVehiclesByClass = async (vehicleClasses: string[]) => {
  try {
    const vehicles = await getAllVehicles();
    return vehicles.filter(
      (vehicle) =>
        vehicle.vehicleStatus === "active" &&
        vehicleClasses.includes(vehicle.vehicleClass)
    );
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    return [];
  }
};

/**
 * Groups an array of items by a specified class type (either 'vehicleClass' or 'licenseClass').
 *
 * @param items - An array of items that have either a 'vehicleClass' or 'licenseClass' property.
 * @param classType - The type of class to group the items by, either 'vehicleClass' or 'licenseClass'.
 * @returns An object where the keys are the unique class values, and the values are arrays of items that have that class.
 */
const groupByClass = <
  T extends { vehicleClass?: string; licenseClass?: string }
>(
  items: T[],
  classType: "vehicleClass" | "licenseClass"
) => {
  return items.reduce((acc, item) => {
    const key = item[classType] || "";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

/**
 * Generates an array of `Date` objects representing the available time slots for a day.
 *
 * @param startOfDay - The `Date` object representing the start of the day.
 * @param slotsPerDay - The number of time slots available per day.
 * @param slotDuration - The duration of each time slot in milliseconds.
 * @returns An array of `Date` objects representing the available time slots.
 */
const generateSlotTimes = (
  startOfDay: Date,
  slotsPerDay: number,
  slotDuration: number
): Date[] => {
  const slotTimes: Date[] = [];
  for (let i = 0; i < slotsPerDay; i++) {
    slotTimes.push(new Date(startOfDay.getTime() + i * slotDuration));
  }
  return slotTimes;
};

/**
 * Determines the slot number for a driver based on their previous assignment or their index.
 *
 * @param driverId - The ID of the driver.
 * @param index - The index of the driver in the list of drivers.
 * @param slotsPerDay - The number of slots available per day.
 * @returns The slot number for the driver.
 */
function determineSlotNumber(
  driverId: string,
  index: number,
  slotsPerDay: number
): number {
  let driverData = driverAssignments.get(driverId);
  if (driverData) {
    return (driverData.lastSlot % slotsPerDay) + 1;
  }
  return (index % slotsPerDay) + 1;
}

/**
 * Checks if the given time slot is already occupied by another driver assignment.
 *
 * @param slotNumber - The number of the time slot to check.
 * @param scheduledTime - The scheduled time for the time slot.
 * @returns `true` if the time slot is already occupied, `false` otherwise.
 */
function isSlotOverlapping(slotNumber: number, scheduledTime: Date): boolean {
  return Array.from(driverAssignments.values()).some(
    ({ lastSlot, lastTime }) =>
      lastSlot === slotNumber && lastTime.getTime() === scheduledTime.getTime()
  );
}

/**
 * Schedules drivers to vehicles based on their license classes and availability.
 *
 * @returns An array of scheduled driver-vehicle assignments, including the driver ID, vehicle ID, vehicle registration, phone number, scheduled time, and slot number.
 */
const scheduleDriversToVehicles = async (): Promise<any[]> => {
  // Clear previous driver assignments to avoid stale data
  driverAssignments.clear();

  const licenseClasses = ["matatu", "minibus", "bus"];
  const slotsPerDay = 20;
  const slotDuration = 30 * 60 * 1000;

  try {
    const [activeDrivers, activeVehicles] = await Promise.all([
      getActiveDriversByClass(licenseClasses),
      getActiveVehiclesByClass(licenseClasses),
    ]);

    if (!activeDrivers.length || !activeVehicles.length) {
      toast.warning(
        "No active drivers or vehicles found for the given classes.",
        {
          duration: 2000,
        }
      );
      console.warn(
        "No active drivers or vehicles found for the given classes."
      );
      return [];
    }

    const groupedDrivers = groupByClass(activeDrivers, "licenseClass");
    const groupedVehicles = groupByClass(activeVehicles, "vehicleClass");

    const startOfDay = new Date();
    startOfDay.setHours(8, 0, 0, 0); // Start at 08:00 AM

    const slotTimes = generateSlotTimes(startOfDay, slotsPerDay, slotDuration);

    const schedule = licenseClasses.flatMap((classType) => {
      const drivers = groupedDrivers[classType] || [];
      const vehicles = groupedVehicles[classType] || [];

      const maxSchedules = Math.min(drivers.length, vehicles.length);

      let lastSlotNumber = 0;

      return drivers.slice(0, maxSchedules).map((driver, index) => {
        const matchedVehicle = vehicles[index];

        let slotNumber = determineSlotNumber(
          driver.id as string,
          index,
          slotsPerDay
        );
        let scheduledTime = slotTimes[slotNumber - 1];

        // Avoid overlapping slots
        while (isSlotOverlapping(slotNumber, scheduledTime)) {
          slotNumber = (slotNumber % slotsPerDay) + 1;
          scheduledTime = slotTimes[slotNumber - 1];
        }

        lastSlotNumber = slotNumber;

        driverAssignments.set(driver.id as string, {
          lastSlot: slotNumber,
          lastTime: scheduledTime,
        });

        return {
          driverId: driver.id,
          vehicleId: matchedVehicle.id,
          vehicleReg: matchedVehicle.vehicleReg,
          phoneNumber: driver.phoneNumber || "",
          scheduledTime: scheduledTime.toISOString(),
          slotNumber: slotNumber.toString(),
        };
      });
    });

    return schedule;
  } catch (error) {
    console.error("Error scheduling drivers to vehicles:", error);
    return [];
  }
};

export interface TripData {
  vehicleReg: string;
  slotNumber: string;
  // driverName: string;
  scheduledTime: string;
  tripNumber: number;
}

/**
 * Generates mock trip data for drivers based on the scheduling function.
 *
 * @param schedule - The initial schedule data generated by `scheduleDriversToVehicles`.
 * @param totalTrips - The total number of trips each driver should have in a day (max 15).
 * @returns An array of trip data for each driver, with each driver making multiple trips.
 */
const generateMockTripData = (
  schedule: any[],
  totalTrips: number = 15
): TripData[] => {
  const mockTripData: TripData[] = [];
  const tripDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds

  for (let trip = 1; trip <= totalTrips; trip++) {
    const tripData = schedule.map((entry) => {
      // Find the last trip for the same vehicle and slot
      const lastTripInClass = mockTripData
        .filter(
          (prevTrip) =>
            prevTrip.slotNumber === entry.slotNumber &&
            prevTrip.vehicleReg === entry.vehicleReg
        )
        .sort(
          (a, b) =>
            new Date(b.scheduledTime).getTime() -
            new Date(a.scheduledTime).getTime()
        )[0];

      // Determine the new scheduled time
      const newScheduledTime = new Date(
        lastTripInClass
          ? new Date(lastTripInClass.scheduledTime).getTime() + tripDuration
          : new Date(entry.scheduledTime).getTime()
      );

      return {
        vehicleReg: entry.vehicleReg,
        slotNumber: entry.slotNumber,
        // driverName: entry.driverName,
        scheduledTime: newScheduledTime.toLocaleDateString(),
        tripNumber: trip,
      };
    });

    mockTripData.push(...tripData);
  }

  return mockTripData;
};



export { scheduleDriversToVehicles, generateMockTripData };
