"use client";

import { getAllVehicles } from "@/app/(backend)/graph/graph-queries";
import { DataTable } from "@/components/DataTable";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Modal";
import VehicleForm from "./components/form";

export default function VehicleListPage() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const { data: vehicles, isLoading } = useQuery({
    queryFn: () => getAllVehicles(),
    queryKey: ["vehicles"],
  });
  return (
    <main>
      <div className="h-24 flex items-center justify-between">
        <div className="text-2xl font-bold capitalize">
          <h1>{pathname.slice(1)}</h1>
        </div>

        <Button
          className="bg-green-700 hover:bg-green-600 capitalize gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus />
          Create new Vehicle
        </Button>
      </div>

      <div>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <div>
            <DataTable columns={columns} data={vehicles ?? []} />
          </div>
        )}
      </div>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <VehicleForm />
      </Modal>
    </main>
  );
}
