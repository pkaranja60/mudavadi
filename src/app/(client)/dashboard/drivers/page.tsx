"use client";

import { usePathname } from "next/navigation";
import { DataTable } from "@/components/DataTable";
import { columns } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Modal from "@/components/Modal";
import { useState } from "react";
import Loader from "@/components/Loader";
import DriverForm from "./components/Form";
import { getAllDrivers } from "@/app/(backend)/graph/graph-queries";

export default function DriverListPage() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const { data: drivers, isLoading } = useQuery({
    queryFn: () => getAllDrivers(),
    queryKey: ["drivers"],
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
          Create new driver
        </Button>
      </div>

      <div>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <div>
            <DataTable columns={columns} data={drivers ?? []} />
          </div>
        )}
      </div>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <DriverForm />
      </Modal>
    </main>
  );
}
