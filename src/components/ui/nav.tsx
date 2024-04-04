import { Bell } from "lucide-react";
import { Button } from "./button";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full h-[76px] px-14 flex items-center justify-between border-b-2 border-b-slate-200">
      <div className="flex-1 ">
        <h1 className="text-2xl text-[#444444] font-bold">BTS</h1>
      </div>

      <div className="flex items-center gap-10">
        <Button variant="ghost" className="rounded-full hover:bg-inherit">
          <Bell fill="#444444" strokeWidth={0} size={28} />
        </Button>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <h4 className="text-lg text-[#232323]">John Doe</h4>
            <h5 className="text-sm text-[#aaaaaa]">Administrator</h5>
          </div>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
