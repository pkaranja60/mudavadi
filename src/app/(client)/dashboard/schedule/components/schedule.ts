import {
  getAllDrivers,
  getAllVehicles,
} from "@/app/(backend)/graph/graph-queries";

// In-memory store to track the last assigned slot and time for each driver
const driverAssignments: Map<string, { lastSlot: number; lastTime: Date }> = new Map();

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

const scheduleDriversToVehicles = async (): Promise<any[]> => {
  const licenseClasses = ["matatu", "minibus", "bus"];
  const slotsPerDay = 20;
  const slotDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  try {
    const [activeDrivers, activeVehicles] = await Promise.all([
      getActiveDriversByClass(licenseClasses),
      getActiveVehiclesByClass(licenseClasses),
    ]);

    const groupedDrivers = groupByClass(activeDrivers, "licenseClass");
    const groupedVehicles = groupByClass(activeVehicles, "vehicleClass");

    const schedule = licenseClasses.flatMap((classType) => {
      const drivers = groupedDrivers[classType] || [];
      const vehicles = groupedVehicles[classType] || [];

      const maxSchedules = Math.min(drivers.length, vehicles.length);

      return drivers.slice(0, maxSchedules).map((driver, index) => {
        const matchedVehicle = vehicles[index];

        // Calculate the starting time of the day
        const startOfDay = new Date();
        startOfDay.setHours(8, 0, 0, 0); // Start at 08:00 AM

        let scheduledTime = new Date(startOfDay.getTime() + index * slotDuration);

        let slotNumber = (index % slotsPerDay) + 1;
        let driverData = driverAssignments.get(driver.id);

        if (driverData) {
          // Ensure time is 30 minutes after the last assigned time
          scheduledTime = new Date(driverData.lastTime.getTime() + slotDuration);

          // Ensure the slot number is updated correctly
          slotNumber = (driverData.lastSlot % slotsPerDay) + 1;

          // Find the next available slot if the current one is filled
          while (Array.from(driverAssignments.values()).some(({ lastSlot }) => lastSlot === slotNumber)) {
            slotNumber = (slotNumber % slotsPerDay) + 1;
          }
        }

        // Update the driverAssignments map with the new slot and time
        driverAssignments.set(driver.id, { lastSlot: slotNumber, lastTime: scheduledTime });

        return {
          driverId: driver.id,
          vehicleId: matchedVehicle.id,
          vehicleReg: matchedVehicle.vehicleReg,
          phoneNumber: driver.phoneNumber,
          scheduledTime: scheduledTime.toISOString(), // ISO 8601 format (24-hour format)
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

export { scheduleDriversToVehicles };
