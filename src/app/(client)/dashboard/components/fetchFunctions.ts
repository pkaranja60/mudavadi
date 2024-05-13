import {getAllDrivers, getAllVehicles} from "@/app/(backend)/graph/graph-queries";

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

const FetchAllDrivers = async () => {
  try {
    const allDrivers = await getAllDrivers();

    return allDrivers.length;
  } catch (error) {
    console.error("Error fetching active vehicles:", error);
    // Handle error (e.g., display toast)
  }
};

export { FetchActiveVehicles, FetchAllDrivers };
