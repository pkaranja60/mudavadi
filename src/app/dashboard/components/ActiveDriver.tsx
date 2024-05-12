import React, { useEffect, useState } from "react";
import { getActiveDriverVehicle, getAllDrivers } from "@/backend/ApiConfig";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActiveDriverData, DriverData } from "@/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ActiveDriver() {
  const [drivers, setDrivers] = useState<ActiveDriverData[]>([]);

  useEffect(() => {
    getAllDriverList();
  }, []);

  const getAllDriverList = async () => {
    try {
      const allDrivers = await getActiveDriverVehicle();
      setDrivers(allDrivers.slice(0, 10)); // Set the drivers in state
    } catch (error) {
      console.error("Error fetching drivers:", error);
      // Handle error (e.g., display toast)
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Active Drivers</CardTitle>
        <CardDescription>Drivers with active vehicles.</CardDescription>
      </CardHeader>

      <CardContent>
        {drivers.map((driver) => (
          <div
            key={driver.nationalId}
            className="flex flex-row items-center justify-between py-3"
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

      <CardFooter>
        <Link href="/dashboard/drivers">
          <Button variant="outline">More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
