import { getAllDrivers, getAllVehicles } from "@/app/(backend)/graph/graph-queries";

const getActiveDriversByClass = async (licenseClasses: string[]) => {
  const drivers = await getAllDrivers();
  const activeDrivers = drivers.filter(
    (driver) =>
      driver.driverStatus === "active" &&
      licenseClasses.includes(driver.licenseClass)
  );
  return activeDrivers;
};

const getActiveVehiclesByClass = async (vehicleClasses: string[]) => {
  const vehicles = await getAllVehicles();
  const activeVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.vehicleStatus === "active" &&
      vehicleClasses.includes(vehicle.vehicleClass)
  );
  return activeVehicles;
};
