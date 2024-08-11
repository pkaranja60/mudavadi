"use client";

import {
  BusFront,
  ContactRound,
  LayoutDashboard,
  CalendarCheck2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { url: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
  { url: "/dashboard/drivers", title: "Drivers", icon: ContactRound },
  { url: "/dashboard/vehicles", title: "Vehicles", icon: BusFront },
  { url: "/dashboard/schedule", title: "Schedule", icon: CalendarCheck2 },
];

export default function BottomNavbar() {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-10 left-0 right-0 container">
      <nav className="bg-[#ebebeb] max-w-sm h-12 px-3 md:max-w-xl md:h-[80px] md:mx-auto md:px-16 flex items-center justify-between rounded-md ">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`flex flex-col items-center justify-center text-center text-[#444444] hover:text-[#232323] ${
              pathName === link.url ? " text-lime-700" : ""
            }`}
          >
            <link.icon className="w-4 h-4 md:w-7 md:h-7" />
            <span className="text-xs md:text-sm">{link.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
