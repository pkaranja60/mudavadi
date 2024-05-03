"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ScheduleForm from "./components/schedule-form";

export default function ScheduleTool() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <main className="w-full px-14">
        <div className="h-24 flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">
            <h1>{pathname.slice(1)}</h1>
          </div>

          <Button
            className="bg-green-700 hover:bg-green-600 capitalize gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            Create new schedule
          </Button>
        </div>
      </main>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <ScheduleForm />
      </Modal>
    </>
  );
}
