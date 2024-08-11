import {
  getAllDrivers,
  getAllVehicles,
} from "@/app/(backend)/graph/graph-queries";
import { DriverData, VehicleData } from "@/schema";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { toast } from "sonner";

// Update the function to accept a route parameter
export async function downloadToExcel(route: string) {
  try {
    let columns: IJsonSheet[] = [];
    let fileNameSuffix = "";

    // Conditionally fetch and prepare data based on the route
    if (route.includes("/drivers")) {
      const drivers: DriverData[] = await getAllDrivers();
      if (drivers && drivers.length > 0) {
        columns.push({
          sheet: "Drivers",
          columns: [
            { label: "National Id", value: "nationalId" },
            { label: "Last Name", value: "lastName" },
            { label: "First Name", value: "firstName" },
            { label: "Phone Number", value: "phoneNumber" },
            { label: "License Number", value: "licenseNumber" },
            {
              label: "License Expiration",
              value: (row: any) =>
                new Date(row.licenseExpiration).toLocaleDateString(),
            },
            { label: "Driver Status", value: "driverStatus" },
          ],
          content: drivers,
        });
        fileNameSuffix = "Drivers";
      }
    }

    if (route.includes("/vehicles")) {
      const vehicles: VehicleData[] = await getAllVehicles();
      if (vehicles && vehicles.length > 0) {
        columns.push({
          sheet: "Vehicles",
          columns: [
            {
              label: "Vehicle Registration",
              value: "vehicleReg",
            },
            {
              label: "Insurance Expiration",
              value: (row: any) =>
                new Date(row.vehicle.insuranceExpiration).toLocaleDateString(),
            },
            {
              label: "Vehicle Type",
              value: "vehicleClass",
            },
            {
              label: "Vehicle Status",
              value: "vehicleStatus",
            },
          ],
          content: vehicles,
        });
        fileNameSuffix = "Vehicles";
      }
    }

    // // Check if there is any data to export
    if (columns.length === 0) {
      toast.error("No data available for the selected route.", {
        duration: 5000,
      });
      return; // Exit the function without generating the file
    }

    // Define settings for the Excel file
    let settings = {
      fileName: `Export_${fileNameSuffix}_${
        new Date().toISOString().split("T")[0]
      }`, // Add suffix and date to the file name
    };

    // Generate and trigger the Excel download
    xlsx(columns, settings);
  } catch (error) {
    toast.error("Failed to download Excel file", {
      duration: 5000,
    });

    console.error("Failed to download Excel file:", error);
  }
}
