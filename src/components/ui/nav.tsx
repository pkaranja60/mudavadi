import { Bell } from "lucide-react";
import { Button } from "./button";
import { auth, currentUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Navbar() {
  const user = await currentUser();

  // console.log(user)

  return (
    <nav className="w-full h-[76px] px-14 flex items-center justify-between border-b-2 border-b-slate-200">
      <div className="flex items-center">
        <Image src="/bts-logo.png" alt="Image" width="80" height="80" />

        <h1 className="text-2xl text-[#444444] font-bold">BTS</h1>
      </div>

      <div className="flex items-center gap-10">
        <Button variant="ghost" className="rounded-full hover:bg-inherit">
          <Bell fill="#444444" strokeWidth={0} size={28} />
        </Button>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <h4 className="text-lg text-[#232323]">
              {user?.firstName} {user?.lastName}
            </h4>
            <h5 className="text-sm text-[#aaaaaa]">Administrator</h5>
          </div>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
