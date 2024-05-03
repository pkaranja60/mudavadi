"use client";

import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { BusFront, ContactRound, LayoutDashboard, CalendarCheck2  } from "lucide-react";
import Link from "next/link";
import NavLinks from "../navLinks";

const links = [
  { url: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
  { url: "/dashboard/drivers", title: "Drivers", icon: ContactRound },
  { url: "/dashboard/vehicles", title: "Vehicles", icon: BusFront },
  { url: "/dashboard/schedule", title: "Schedule", icon: CalendarCheck2 },
];

const containerVariants = {
  close: {
    width: "76px",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "176px",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [containerControls, isOpen]);

  const handleOpenClose = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);

    setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-[#ebebeb] flex flex-col z-10 gap-3.5 absolute top-0 left-0 h-full border-r-2 border-slate-200 "
      >
        <div className="flex flex-row justify-center place-items-center h-[76px] border-b-2 border-b-slate-300">
          <Button
            className="flex flex-col gap-2 w-full h-[76px] rounded-none justify-center bg-[#fdb255] hover:bg-slate-400"
            onClick={handleOpenClose}
          >
            <motion.div
              variants={topVariants}
              animate={isOpen ? "opened" : "closed"}
              className="w-11 h-1.5 bg-white rounded origin-left"
            ></motion.div>
            <motion.div
              variants={centerVariants}
              animate={isOpen ? "opened" : "closed"}
              className="w-11 h-1.5 bg-white rounded"
            ></motion.div>
            <motion.div
              variants={bottomVariants}
              animate={isOpen ? "opened" : "closed"}
              className="w-11 h-1.5 bg-white rounded origin-left"
            ></motion.div>
          </Button>
        </div>
        <div className="flex flex-col">
          {/* LINKS */}
          {links.map((link) => (
            <NavLinks
              key={link.title}
              link={link}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      </motion.nav>
    </>
  );
}
