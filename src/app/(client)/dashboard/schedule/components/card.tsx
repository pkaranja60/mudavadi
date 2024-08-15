import { Card, CardFooter } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteSchedule } from "@/app/(backend)/graph/graph-queries";

export default function renderScheduleCards(data: any, className: string) {
  if (data.length === 0) {
    return <p className="mt-5 mb-5 ">No data available.</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Time";
    }
    return date.toLocaleTimeString();
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteSchedule(id);

      console.log("Schedule deleted successfully");
      toast.warning("Schedule deleted successfully", {
        duration: 5500,
      });
    } catch (error) {
      console.error("Error deleting schedule:", error);
      // Handle error (e.g., display toast or update UI with error message)
    }
  };

  function handleDeleteScheduleConfirmation(id: string) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (isConfirmed) {
      handleDeleteSchedule(id); // Proceed with deletion
    }
  }

  return (
    <div className="mt-5 mb-5 flex flex-row gap-5">
      {data?.map((schedule: any) => (
        <Card
          className={`${className} text-xs hover:text-sm font-medium tracking-tighter`}
          key={schedule.id}
        >
          <div>
            <p>
              {schedule.driver.firstName} {schedule.driver.lastName}
            </p>
            <p>{schedule.vehicle.vehicleReg}</p>
            <p>Date: {formatDate(schedule.scheduleTime)}</p>
            <p>Start Time: {formatTime(schedule.scheduleTime)}</p>
            <p>Slot: {schedule.slotNumber}</p>
          </div>

          <div className="h-5">
            <Trash2
              className="w-5 h-5 text-red-500 hover:scale-125 mt-5 ml-auto"
              onClick={() => handleDeleteScheduleConfirmation(schedule.id)}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
