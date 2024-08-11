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
      <h1 className="text-xl font-medium text-center mt-10 mb-10">Overview</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 hidden md:block  rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
          <BarGraph />
        </div>

        {/* <div className="rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6">
          <DoughnutChart />
        </div> */}
      </div>

      <div className="">
        <ActiveDriver />
      </div>
    </main>
  );
}
