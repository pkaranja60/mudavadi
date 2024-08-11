"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useUser(); // useUser hook to get user data
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 w-full h-[80px] px-5 md:px-20 flex items-center justify-between border-b-[1px] border-b-slate-200 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/bts-logo.png"
          alt="Image"
          width="90"
          height="90"
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <h1 className="text-md md:text-2xl text-[#444444] font-bold">BTS</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden md:block">
          <h4 className="text-lg text-[#232323]">
            {user?.firstName} {user?.lastName}
          </h4>
          <h5 className="text-sm text-[#aaaaaa]">Administrator</h5>
        </div>

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
