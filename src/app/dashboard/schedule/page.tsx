"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function ScheduleTool() {
  const pathname = usePathname();

  return (
    <main className="w-full px-14">
      <div className="h-24 flex items-center justify-between">
        <div className="text-2xl font-bold capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>
      </div>
    </main>
  );
}
