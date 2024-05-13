"use client";

import {createNewSchedule} from "@/app/(backend)/graph/graph-queries";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {CardHeader} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {ScheduleData, ScheduleSchema} from "@/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {SubmitHandler, useForm} from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import {toast} from "sonner";
import {z} from "zod";

const getCurrentYear = () => new Date().getFullYear();

const getYearAhead = (years = 10) => {
    const currentYear = new Date().getFullYear();
    return currentYear + years;
};

export default function ScheduleForm({
                                         nationalId,
                                         vehicleReg,
                                         phoneNumber,
                                           closeModal,
                                     }: {
    nationalId: string;
    phoneNumber: string;
    vehicleReg: string;
    closeModal: () => void;
}) {
    const form = useForm<z.infer<typeof ScheduleSchema>>({
        resolver: zodResolver(ScheduleSchema),
        defaultValues: {
            slotNumber: "",
            startTime: "",
            scheduleDate: new Date(),
        },
    });

    const sendSms = async (formData: ScheduleData) => {
        try {
            const response = await fetch("/api/send-sms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: ensurePlusSign(phoneNumber), // This is the recipient's phone number
                    message: `Your vehicle  ${vehicleReg} is schedule for slot  ${
             formData.slotNumber
           } is on ${new Date(formData.scheduleDate).toLocaleDateString()} at ${
             formData.startTime
           }.`,
         }),
            });

            if (!response.ok) {
                throw new Error("Failed to send SMS");
            }

            const data = await response.json();
            console.log("SMS sent successfully:", data.message);
            toast.success("SMS sent successfully", {
                duration: 5000,
            });
        } catch (error) {
            console.error("Error sending SMS:", error);
            // Handle error appropriately, e.g., show error message to the user
        }
    };

    function ensurePlusSign(phoneNumber: string) {
  if (!phoneNumber.startsWith("+")) {
    return "+" + phoneNumber;
  } else {
    return phoneNumber;
  }
}

    const onSubmit: SubmitHandler<ScheduleData> = async (formData) => {
        try {

            const result = await createNewSchedule(formData, nationalId, vehicleReg);

            console.log(result);

            if (result) {
                // Show toast notification for success
                toast.success("Schedule created successfully!", {
                    duration: 5000,
                });

                console.log("Schedule created successfully!");

                // Close the modal
           closeModal();

                // Send SMS
                await sendSms(formData);

                // Reset the form to its default values
                form.reset();

            } else {
                toast.error("Failed to create Schedule.", {
                    duration: 5500,
                });
            }

        } catch (error) {
            console.error("Error creating Schedule:", error);
        }
    };

    return (
        <div className="p-5">
            <CardHeader className="h-16 text-center text-2xl font-bold py-2">
                Create New Schedule
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="scheduleDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Scheduled Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" className="w-full">
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                captionLayout="dropdown-buttons"
                                                fromYear={getCurrentYear()}
                                                toYear={getYearAhead()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="time"
                                            placeholder="enter time in 24Hrs i.e. 14:00"
                                        />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="slotNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Slot Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="enter number between 1-20"
                                        />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* button */}
                    <div className="flex justify-center">
                        <Button className="w-1/2 h-14 bg-[#fdb255] hover:bg-slate-400">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
