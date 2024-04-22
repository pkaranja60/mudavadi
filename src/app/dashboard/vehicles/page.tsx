"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import VehicleForm from "./components/vehicle-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function VehicleListPage() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <main className="w-full px-14">
        <div className="h-28 flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">
            <h1>{pathname.slice(1)}</h1>
          </div>

          <Button
            className="bg-green-700 hover:bg-green-600 capitalize gap-2"
            onClick={() => setShowModal(true)}
          >
            <Plus />
            Create new vehicle
          </Button>
        </div>

        {/* <DataTable columns={columns} data={} /> */}
      </main>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <VehicleForm />
      </Modal>
    </>
  );
}
