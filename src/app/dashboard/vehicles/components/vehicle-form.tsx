"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleData, VehicleSchema } from "@/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { createNewVehicle } from "@/backend/ApiConfig";
import { toast } from "sonner";

export default function VehicleForm() {
  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vehicleReg: "",
      insuranceExpiration: new Date(),
      vehicleStatus: "active",
      vehicleClass: "I",
    },
  });


  const onSubmit: SubmitHandler<VehicleData> = async (formData) => {
    try {
      const result = await createNewVehicle(formData);

      console.log(result);
      if (result) {
        // Show toast notification for success
        toast.success("Vehicle added successfully!", {
          duration: 5500,
        });
        console.log("Vehicle added successfully!");
        // Reset the form to its default values
        form.reset();
      } else {
        toast.error("Failed to add vehicle.", {
          duration: 5500,
        });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="text-center font-bold py-2">
        Add New Vehicle
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
          <div>
            <FormField
              control={form.control}
              name="vehicleReg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="KCDxxxxx"  />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="insuranceExpiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-full">
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
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
              name="vehicleStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">active</SelectItem>
                      <SelectItem value="suspended">suspended</SelectItem>
                      <SelectItem value="inactive">inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                  <FormDescription className="text-xs">
                    Please ensure the vehicle type is correct. Default option is{" "}
                    <span className="text-red-300  font-medium">
                      {field.value}
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="vehicleClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Class</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="I">class I</SelectItem>
                      <SelectItem value="II">class II</SelectItem>
                      <SelectItem value="III">class III</SelectItem>
                      <SelectItem value="IV">class IV</SelectItem>
                      <SelectItem value="V">class V</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                  <FormDescription className="text-xs">
                    Please ensure the vehicle type is correct. Default option is
                    <span className="text-red-300  font-medium">
                      {field.value}
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div>
            <Button className="w-full h-14 bg-[#fdb255] hover:bg-slate-400">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
