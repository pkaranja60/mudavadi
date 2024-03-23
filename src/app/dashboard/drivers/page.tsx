"use client";

import { usePathname } from "next/navigation";

export default function DriverPage() {
  const pathname = usePathname();
  return <main className="w-full">{pathname.slice(1)}</main>;
}
