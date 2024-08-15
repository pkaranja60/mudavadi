import {
  getAllDrivers,
  getAllVehicles,
} from "@/app/(backend)/graph/graph-queries";


const FetchActiveVehicles = async () => {
  try {
    const allVehicles = await getAllVehicles();

    const activeVehicles = allVehicles.filter(
      (vehicle) => vehicle.vehicleStatus === "active"
    );

    return activeVehicles.length;
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    // Handle error (e.g., display toast)
  }
};

const FetchInactiveVehicles = async () => {
  try {
    const allVehicles = await getAllVehicles();

    const activeVehicles = allVehicles.filter(
      (vehicle) => vehicle.vehicleStatus === "inactive"
    );

    return activeVehicles.length;
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    // Handle error (e.g., display toast)
  }
};

const FetchAllDrivers = async () => {
  try {
    const allDrivers = await getAllDrivers();

    return allDrivers.length;
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    // Handle error (e.g., display toast)
  }
};

const FetchActiveDrivers = async () => {
  try {
    const allDrivers = await getAllDrivers();

    const activeDriver = allDrivers.filter(
      (driver) => driver.driverStatus === "active"
    );

    return activeDriver.length;
  } catch (error) {
    console.error("Error fetching active driver", error);
    // Handle error (e.g., display toast)
  }
};

const FetchAllInactiveDrivers = async () => {
  try {
    const allDrivers = await getAllDrivers();

    const inactiveDrivers = allDrivers.filter(
      (driver) =>
        driver.driverStatus === "inactive" ||
        driver.driverStatus === "suspended"
    );

    return inactiveDrivers.length;
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    // Handle error (e.g., display toast)
  }
};

export {
  FetchActiveVehicles,
  FetchInactiveVehicles,
  FetchAllDrivers,
  FetchActiveDrivers,
  FetchAllInactiveDrivers,
};
