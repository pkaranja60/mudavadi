import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { getAllDriversVehicles } from "@/backend/ApiConfig";

interface ChartData {
  name: string;
  Drivers: number;
  Vehicles: number;
}

export default function BarGraph() {
  const [data, setData] = useState<ChartData[]>([]);

  const fetchData = async () => {
    try {
      const results = await getAllDriversVehicles(); // Assuming this returns an array of drivers
      const activeDrivers = results.filter(
        (driver) => driver.driverStatus.toLowerCase() === "active"
      ).length;

      const activeVehicles = results.reduce(
        (acc, driver) =>
          acc +
          (driver.vehicle &&
          driver.vehicle.vehicleStatus.toLowerCase() === "active"
            ? 1
            : 0),
        0
      );

      setData([
        { name: "Active Drivers", Drivers: activeDrivers, Vehicles: 0 },
        { name: "Active Vehicles", Drivers: 0, Vehicles: activeVehicles },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., display toast)
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height="88%">
      <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="Drivers" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="Vehicles" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
