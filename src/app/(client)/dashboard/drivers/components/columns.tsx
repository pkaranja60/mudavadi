"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DriverData } from "@/schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2, SquarePen } from "lucide-react";
import { useState } from "react";
import ScheduleForm from "../../schedule/components/form";
import Modal from "@/components/modal";
import { deleteDriver } from "@/app/(backend)/graph/graph-queries";
import { toast } from "sonner";

const ScheduleCell = ({
  nationalId,
  vehicleReg,
  vehicleStatus,
  phoneNumber,
}: {
  nationalId: string;
  phoneNumber: string;
  vehicleReg: string;
  vehicleStatus: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  const isVehicleActive = vehicleStatus === "active";

  return (
    <>
      {isVehicleActive && (
        <Button variant="outline" onClick={() => setShowModal(true)}>
          Schedule
        </Button>
      )}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <ScheduleForm
          nationalId={nationalId}
          vehicleReg={vehicleReg}
          phoneNumber={phoneNumber}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

const handleDeleteDriver = async (id: string) => {
  try {
    await deleteDriver(id);

    toast.success("Driver deleted successfully", {
      duration: 5500,
    });
  } catch (error) {
   toast.error("Driver deleted successfully", {
     duration: 5500,
   });
  }
};

export const columns: ColumnDef<DriverData>[] = [
  {
    accessorKey: "nationalId",
    header: "National ID",
    enableHiding: false,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center gap-1">
          Last Name
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <ArrowUpDown className="w-5 h-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "licenseNumber",
    header: "License Number",
  },
  {
    accessorKey: "licenseExpiration",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center gap-1">
          License Expiration
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <ArrowUpDown className="w-5 h-5" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const licenseExpiration = row.getValue("licenseExpiration");
      const formatted = new Date(
        licenseExpiration as string
      ).toLocaleDateString();
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "driverStatus",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center gap-1">
          Status
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <ArrowUpDown className="w-5 h-5" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { driverStatus } = row.original;

      // Define the style based on the driverStatus value
      let style = {};
      switch (driverStatus) {
        case "active":
          style = {
            backgroundColor: "green",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        case "suspended":
          style = {
            backgroundColor: "yellow",
            color: "black",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        case "inactive":
          style = {
            backgroundColor: "red",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          };
          break;
        default:
          style = { padding: "5px" }; // Default style if none of the cases match
      }

      // Return the cell content with the appropriate style
      return <span style={style}>{driverStatus}</span>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between">
              Update
              <SquarePen className="w-4 h-4 text-blue-500" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => Id && handleDeleteDriver(Id)}
            >
              Delete
              <Trash2 className="w-4 h-4 text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
