import { getAllDriversVehicles } from "@/app/(backend)/graph/graph-queries";
import {DriverColumn, DriverData} from "@/schema";
import xlsx, { IJsonSheet } from "json-as-xlsx";

export async function downloadToExcel() {
  // Fetch drivers data
  const drivers: DriverColumn[] = await getAllDriversVehicles();

  let columns: IJsonSheet[] = [
    {
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
        {
          label: "vehicle Registration",
          value: (row: any) => row.vehicle.vehicleReg,
        },
        {
          label: "Insurance Expiration",
          value: (row: any) =>
            new Date(row.vehicle.insuranceExpiration).toLocaleDateString(),
        },
        {
          label: "Vehicle Type",
          value: (row: any) => row.vehicle.vehicleClass,
        },
        {
          label: "Vehicle Status",
          value: (row: any) => row.vehicle.vehicleStatus,
        },
      ],
      content: drivers,
    },
  ];
  let settings = {
    fileName: "Drivers Excel",
  };

  xlsx(columns, settings);
}
