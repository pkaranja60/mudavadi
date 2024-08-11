"use client";

import { usePathname } from "next/navigation";
import ActiveDriver from "./components/ActiveDriver";
import StatsCard from "./components/StatsCard";
import BarGraph from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <main className="w-full space-y-4 mx-auto">
      <div className="h-24 flex items-center text-2xl font-bold  capitalize">
        <h1>{pathname.slice(1)}</h1>
      </div>

      {/* Stats */}
      <StatsCard />

      {/* Charts */}
      <div className="">
        <BarGraph />

        <div className="flex max-w-xl items-center sm:max-w-[120px]">
          {/* <DoughnutChart /> */}
        </div>
      </div>

      <div className="">
        <ActiveDriver />
      </div>
    </main>
  );
}
