import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinkProps {
  link: {
    url: string;
    title: string;
    icon: LucideIcon;
  };
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function NavLinks({ link, isOpen, setIsOpen }: LinkProps) {
  const pathName = usePathname();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <Link href={link.url} onClick={handleClick}>
      <button
        className={`w-full flex justify-start gap-3 py-5 px-5 text-neutral-400 hover:bg-slate-200 hover:text-stone-500 ${
          pathName === link.url ? "bg-white text-slate-800" : ""
        }`}
      >
        <div className="w-7 h-7">

          {<link.icon style={{ width: "30px", height: "30px" }} />}
        </div>
        <p className="text-inherit text-base font-semibold overflow-clip whitespace-nowrap tracking-wide">
          {isOpen && link.title}
        </p>
      </button>
    </Link>
  );
}
