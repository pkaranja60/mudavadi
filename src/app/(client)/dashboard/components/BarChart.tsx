"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FetchActiveDrivers, FetchActiveVehicles } from "./fetchFunctions";

interface ChartData {
  name: string;
  Drivers: number;
  Vehicles: number;
}

export default function BarGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const fetchData = async () => {
    try {
      const activeDrivers = await FetchActiveDrivers();
      const activeVehicles = await FetchActiveVehicles();

      // Ensure values are numbers
      const driversCount = activeDrivers || 0;
      const vehiclesCount = activeVehicles || 0;

      setData([
        {
          name: "Active Stats",
          Drivers: driversCount,
          Vehicles: vehiclesCount,
        },
      ]);
    } catch (error) {
      toast.error("Error fetching data:", {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={750}
        height={350}
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Drivers"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Vehicles"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
