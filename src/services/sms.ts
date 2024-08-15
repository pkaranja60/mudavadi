import { ScheduleData } from "@/schema";
import { toast } from "sonner";

export function ensurePlusSign(phoneNumber?: string): string {
  if (!phoneNumber) {
    return "";
  }
  return phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
}

export async function sendSms(scheduleData: ScheduleData) {
  const phoneNumber = scheduleData.phoneNumber;
  try {
    const response = await fetch("/api/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: ensurePlusSign(phoneNumber),
        message: `You are scheduled to drive vehicle ${
          scheduleData.vehicleReg
        } in slot ${scheduleData.slotNumber} on ${new Date(
          scheduleData.scheduledTime
        ).toLocaleDateString()} at ${new Date(
          scheduleData.scheduledTime
        ).toLocaleTimeString()}.`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send SMS");
    }

    toast.success("SMS sent successfully", {
      duration: 2000,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    toast.error("Failed to send SMS. Please try again.", {
      duration: 5000,
    });
  }
}
