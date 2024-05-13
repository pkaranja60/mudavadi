"use client";

import { usePathname } from "next/navigation";
import ActiveDriver from "./components/ActiveDriver";
import StatsCard from "./components/StatsCard";
import BarGraph from "./components/bar";

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
          {/* Charts */}
          <BarGraph />

          {/* ActiveDrivers */}
          <ActiveDriver />
        </div>
      </div>
    </main>
  );
}
