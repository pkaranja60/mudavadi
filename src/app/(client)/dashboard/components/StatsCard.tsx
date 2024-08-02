import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { FetchActiveVehicles, FetchAllDrivers } from "./fetchFunctions";

export default function StatsCard() {
  const [activeVehiclesCount, setActiveVehiclesCount] = useState<number>(0);
  const [allDriversCount, setAllDriversCount] = useState<number>(0);
  const [previousDriversCount, setPreviousDriversCount] = useState<
    number | null
  >(null);
  const [newDriversPercentage, setNewDriversPercentage] = useState<
    number | null
  >(null);

  useEffect(() => {
    FetchActiveVehicles().then((count) => {
      setActiveVehiclesCount(count || 0);
    });

    FetchAllDrivers().then((count) => {
      // Set the current count of all drivers
      setAllDriversCount(count || 0);

      // Calculate the percentage of new drivers added
      if (previousDriversCount !== null) {
        const newCount = count || 0;
        const prevCount = previousDriversCount || 0;
        const percentage = ((newCount - prevCount) / prevCount) * 100;
        setNewDriversPercentage(percentage);
      }

      // Update the previous count of drivers
      setPreviousDriversCount(count || 0);
    });
  }, [previousDriversCount]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCardItem
        title="Total Revenue"
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
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
        content="0"
        percentage={0}
      />

      <StatsCardItem
        title="Bus Trips"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M4 6 2 7" />
            <path d="M10 6h4" />
            <path d="m22 7-2-1" />
            <rect width="16" height="16" x="4" y="3" rx="2" />
            <path d="M4 11h16" />
            <path d="M8 15h.01" />
            <path d="M16 15h.01" />
            <path d="M6 19v2" />
            <path d="M18 21v-2" />
          </svg>
        }
        content="0"
        percentage={0}
      />

      <StatsCardItem
        title="Total Active Drivers"
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
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        }
        content={allDriversCount}
        percentage={newDriversPercentage}
      />

      <StatsCardItem
        title="Total Active Vehicles"
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
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
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
