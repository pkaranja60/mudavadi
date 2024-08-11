import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DriverData } from "@/schema";
import { getAllDrivers } from "@/app/(backend)/graph/graph-queries";

export default function ActiveDriver() {
  const [drivers, setDrivers] = useState<DriverData[]>([]);

  const getAllDriverList = async () => {
    try {
      const activeDrivers = await getAllDrivers();

      const activeDriver = activeDrivers.filter(
        (driver) => driver.driverStatus === "active"
      );

      setDrivers(activeDriver.slice(0, 10)); // Set the drivers in state
    } catch (error) {
      console.error("Error fetching active driver", error);
      // Handle error (e.g., display toast)
    }
  };

  useEffect(() => {
    getAllDriverList();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Active Drivers</CardTitle>
      </CardHeader>

      <CardContent className="h-3/4">
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

      {/* <CardFooter>
        <Link href="/dashboard/drivers" className="ml-auto">
          <Button variant="outline">More</Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}
