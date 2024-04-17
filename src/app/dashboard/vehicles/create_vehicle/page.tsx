"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VehicleForm from "../components/vehicle-form";

export default function CreateDriverPage() {
  const pathname = usePathname();
  return (
    <>
      <main className="w-full h-full px-14">
        <div className="h-28 flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">
            <h1>{pathname.slice(1)}</h1>
          </div>

          <Link href="/dashboard/vehicles">
            <Button className="bg-[#fdb255] hover:bg-slate-400 capitalize ">
              View vehicles list
            </Button>
          </Link>
        </div>

        <VehicleForm />
      </main>
    </>
  );
}
