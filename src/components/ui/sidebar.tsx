"use client";

import { Button } from "./button";
import { motion } from "framer-motion";
import { useState } from "react";
import { BusFront, ContactRound, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const links = [
  { url: "/dashboard", title: "Dashboard" },
  { url: "/dashboard/drivers", title: "Drivers" },
  { url: "/dashboard/vehicles", title: "Vehicles" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255, 255, 255)",
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255, 255, 255)",
    },
  };
  return (
    <nav className="h-screen w-[76px] bg-[#ebebeb] border-r-2 border-r-slate-200">
      <div className="h-[76px]">
        <Button
          className="flex flex-col gap-1.5 bg-[#444444] rounded-none w-[76px] h-[76px]"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-12 h-1 bg-white rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-12 h-1 bg-white rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-12 h-1 bg-white rounded origin-left"
          ></motion.div>
        </Button>
      </div>
      <div className="flex flex-col gap-4 h-[calc(100vh - 76px)] py-5">
       
      </div>
    </nav>
  );
}
