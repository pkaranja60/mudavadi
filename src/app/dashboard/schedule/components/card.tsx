import { Card } from "@/components/ui/card";

export default function renderScheduleCards(data: any, className: string) {
  if (data.length === 0) {
    return <p className="mt-5 mb-5 ">No data available.</p>;
  }

  return (
    <div className="mt-5 mb-5 ">
      {data?.map((schedule: any) => (
        <Card className={`${className}`} key={schedule.id}>
          <p className="hover:text-xl font-medium tracking-wide">
            {schedule.driver.firstName} {schedule.driver.lastName}
          </p>
          <p className="text-xs hover:text-md font-medium tracking-wide text-slate-400">
            {schedule.vehicle.vehicleReg}
          </p>
          <p className="text-xs hover:text-lg tracking-wide">
            Date: {new Date(schedule.scheduleDate).toLocaleDateString()}
          </p>
          <p className="text-xs hover:text-lg tracking-wide">
            Start Time: {schedule.startTime}
          </p>
          <p className="text-sm hover:text-lg font-medium tracking-wide">
            Slot: {schedule.slotNumber}
          </p>
        </Card>
      ))}
    </div>
  );
}
