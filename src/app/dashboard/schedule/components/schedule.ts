import { getActiveDriverVehicle } from "@/backend/ApiConfig";

// Function to fetch data and schedule drivers and vehicles
export async function fetchDataAndSchedule(): Promise<void> {
  // Fetch data
  const drivers = await getActiveDriverVehicle();

  // Iterate over the retrieved drivers and vehicles
  drivers.forEach((driver) => {
    const { vehicle } = driver;
    // Check if both driver and vehicle are active before scheduling
    if (
      driver.driverStatus === "active" &&
      vehicle &&
      vehicle.status === "active"
    ) {
      // Call the scheduling function with the driver and vehicle data
      generateSchedule(driver, vehicle);
    }
  });

  console.log("Scheduling completed.");
}

// Function to generate schedules and allocate slot numbers
function generateSchedule(driver: any, vehicle: any): void {
  // Your scheduling logic here...
  const today = new Date();
  const currentDay = today.getDate();

  // Reset slot numbers to 1 if a new day starts or slot count reaches 20
  if (currentDay !== today.getDate() || isSlotCountReachedMax(vehicle)) {
    resetSlotNumbers(vehicle);
  }

  // Check if both driver and vehicle are active before scheduling
  if (driver.driverStatus === "active" && vehicle.status === "active") {
    const slotNumber = assignSlotNumber(vehicle);
    console.log(
      `Scheduling driver ${driver.lastName} with vehicle ${vehicle.vehicleReg} in slot ${slotNumber}.`
    );
    // Add your scheduling logic here...
  }
}

// Function to assign slot number based on vehicle type
function assignSlotNumber(vehicle: any): number {
  if (!vehicle.slotCount) {
    vehicle.slotCount = 0;
  }
  // Increment slot count based on vehicle type
  switch (vehicle.type) {
    case "bus":
      vehicle.slotCount = (vehicle.slotCount % 20) + 1; // Ensure slot count stays within 1-20 range
      return vehicle.slotCount;
    case "minivan":
      vehicle.slotCount = (vehicle.slotCount % 20) + 1;
      return vehicle.slotCount + 20; // Offset for minivans
    case "shuttle":
      vehicle.slotCount = (vehicle.slotCount % 20) + 1;
      return vehicle.slotCount + 40; // Offset for shuttles
    default:
      return 0; // Default slot number
  }
}

// Function to check if slot count reached maximum (20)
function isSlotCountReachedMax(vehicle: any): boolean {
  return vehicle.slotCount && vehicle.slotCount >= 20;
}

// Function to reset slot numbers to 1 at the start of a new day or when slot count reaches 20
function resetSlotNumbers(vehicle: any): void {
  vehicle.slotCount = 0;
}
