"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import ActiveDriver from "./components/ActiveDriver";
import StatsCard from "./components/StatsCard";

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <main className="w-full">
      <div className="h-24 flex items-center px-14 text-2xl font-bold  capitalize">
        <h1>{pathname.slice(1)}</h1>
      </div>
      <div className="flex-1 space-y-4 px-20 pt-6">
        <StatsCard />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>To be Updated Soon!</p>
            </CardContent>
          </Card>

          {/* ActiveDrivers */}

          <ActiveDriver />
        </div>
      </div>
    </main>
  );
}
