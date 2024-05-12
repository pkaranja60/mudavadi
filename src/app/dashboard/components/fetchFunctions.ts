import { getAllVehicles } from "@/backend/ApiConfig";

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

export { FetchActiveVehicles };
