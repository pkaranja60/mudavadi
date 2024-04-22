import xlsx, { IJsonSheet } from "json-as-xlsx";

export function downloadToExcel() {

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
          label: "licenseExpiration",
          value: (row: any) =>
            new Date(row.licenseExpiration).toLocaleDateString(),
        },
        { label: "Status", value: "driverStatus" },
      ],
      content: drivers,
    },
  ];
  let settings = {
    fileName: "Drivers Excel",
  };

  xlsx(columns, settings);
}