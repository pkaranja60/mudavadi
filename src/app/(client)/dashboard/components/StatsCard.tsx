import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  FetchActiveVehicles,
  FetchAllDrivers,
  FetchAllInactiveDrivers,
  FetchInactiveVehicles,
} from "./fetchFunctions";

export default function StatsCard() {
  const [activeVehiclesCount, setActiveVehiclesCount] = useState<number>(0);
  const [inactiveVehiclesCount, setInactiveVehiclesCount] = useState<number>(0);
  const [allDriversCount, setAllDriversCount] = useState<number>(0);
  const [allInactiveDriversCount, setAllInactiveDriversCount] =
    useState<number>(0);
  const [previousDriversCount, setPreviousDriversCount] = useState<
    number | null
  >(null);
  const [newDriversPercentage, setNewDriversPercentage] = useState<
    number | null
  >(null);
  const [previousInactiveDriversCount, setPreviousInactiveDriversCount] =
    useState<number | null>(null);
  const [newInactiveDriversPercentage, setNewInactiveDriversPercentage] =
    useState<number | null>(null);
  const [previousVehicleCount, setPreviousVehicleCount] = useState<
    number | null
  >(null);
  const [newVehiclePercentage, setNewVehiclePercentage] = useState<
    number | null
  >(null);
  const [previousInactiveVehicleCount, setPreviousInactiveVehicleCount] =
    useState<number | null>(null);
  const [newInactiveVehiclePercentage, setNewInactiveVehiclePercentage] =
    useState<number | null>(null);

  useEffect(() => {
    FetchActiveVehicles().then((count) => {
      // Set the current count of all drivers
      const newCount = count || 0;
      setActiveVehiclesCount(newCount);

      // Calculate the percentage of new drivers added
      if (previousVehicleCount !== null && previousVehicleCount > 0) {
        const prevCount = previousVehicleCount;
        const percentage = ((newCount - prevCount) / prevCount) * 100;
        setNewVehiclePercentage(percentage);
      } else if (previousDriversCount === 0) {
        setNewVehiclePercentage(100); // Handle case where previous count was 0 (all drivers are "new")
      }

      // Update the previous count of drivers
      setPreviousVehicleCount(count || 0);
    });

    FetchInactiveVehicles().then((count) => {
      setInactiveVehiclesCount(count || 0);

      // Set the current count of all drivers
      const newCount = count || 0;
      setAllInactiveDriversCount(newCount);

      // Calculate the percentage of new drivers added
      if (
        previousInactiveVehicleCount !== null &&
        previousInactiveVehicleCount > 0
      ) {
        const prevCount = previousInactiveVehicleCount;
        const percentage = ((newCount - prevCount) / prevCount) * 100;
        setNewInactiveVehiclePercentage(percentage);
      } else if (previousDriversCount === 0) {
        setNewInactiveVehiclePercentage(100); // Handle case where previous count was 0 (all drivers are "new")
      }

      // Update the previous count of drivers
      setPreviousInactiveVehicleCount(count || 0);
    });

    FetchAllDrivers().then((count) => {
      // Set the current count of all drivers
      const newCount = count || 0;
      setAllDriversCount(newCount);

      // Calculate the percentage of new drivers added
      if (previousDriversCount !== null && previousDriversCount > 0) {
        const prevCount = previousDriversCount;
        const percentage = ((newCount - prevCount) / prevCount) * 100;
        setNewDriversPercentage(percentage);
      } else if (previousDriversCount === 0) {
        setNewDriversPercentage(100); // Handle case where previous count was 0 (all drivers are "new")
      }

      // Update the previous count of drivers
      setPreviousDriversCount(count || 0);
    });

    FetchAllInactiveDrivers().then((count) => {
      // Set the current count of all drivers
      const newCount = count || 0;
      setAllInactiveDriversCount(newCount);

      // Calculate the percentage of new drivers added
      if (
        previousInactiveDriversCount !== null &&
        previousInactiveDriversCount > 0
      ) {
        const prevCount = previousInactiveDriversCount;
        const percentage = ((newCount - prevCount) / prevCount) * 100;
        setNewInactiveDriversPercentage(percentage);
      } else if (previousDriversCount === 0) {
        setNewInactiveDriversPercentage(100); // Handle case where previous count was 0 (all drivers are "new")
      }

      // Update the previous count of drivers
      setPreviousInactiveDriversCount(count || 0);
    });
  }, [
    previousDriversCount,
    previousInactiveDriversCount,
    previousInactiveVehicleCount,
    previousVehicleCount,
  ]);

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCardItem
        title="Total Drivers"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
        content={allDriversCount}
        percentage={newDriversPercentage}
      />

      <StatsCardItem
        title="Active Vehicles"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
        content={activeVehiclesCount}
        percentage={newVehiclePercentage}
      />

      <StatsCardItem
        title="Inactive Drivers"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
        content={allInactiveDriversCount}
        percentage={newInactiveDriversPercentage}
      />

      <StatsCardItem
        title="Inactive Vehicles"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        }
        content={inactiveVehiclesCount}
        percentage={newInactiveVehiclePercentage}
      />
    </div>
  );
}

interface Props {
  title: string;
  icon: JSX.Element;
  content: string | number;
  percentage?: any;
}

const StatsCardItem: React.FC<Props> = ({
  title,
  icon,
  content,
  percentage,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs md:text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        {percentage !== undefined && (
          <p className="text-xs text-muted-foreground">
            +{percentage}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};
