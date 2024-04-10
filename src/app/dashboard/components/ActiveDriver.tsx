import React, { useEffect, useState } from "react";
import { getAllDrivers } from "@/backend/ApiConfig";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DriverActiveData {
  id: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  nationalId: string;
  licenseNumber: string;
  licenseExpiration: Date;
  driverStatus: string;
}

export default function ActiveDriver() {
  const [drivers, setDrivers] = useState<DriverActiveData[]>([]);

  useEffect(() => {
    getAllDriverList();
  }, []);

  const getAllDriverList = async () => {
    try {
      const drivers = await getAllDrivers();
      setDrivers(drivers); // Set the drivers in state
    } catch (error) {
      console.error("Error fetching drivers:", error);
      // Handle error (e.g., display toast)
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Active Drivers</CardTitle>
        <CardDescription>Active routes this month.</CardDescription>
      </CardHeader>

      <CardContent>
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex flex-row items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  {driver.lastName} {driver.firstName}
                </p>
                <p className="text-xs text-zinc-500">+{driver.phoneNumber}</p>
              </div>
            </div>
            <p className="text-green-600 bg-green-100 p-1 rounded">
              {driver.driverStatus}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
