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
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleSchema, VehicleData } from "@/schema";
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
import { toast } from "sonner";
import { createNewVehicleData } from "@/app/(backend)/graph/graph-queries";
import "react-phone-input-2/lib/style.css";

const getCurrentYear = () => new Date().getFullYear();

const getYearAhead = (years = 10) => {
  const currentYear = new Date().getFullYear();
  return currentYear + years;
};

export default function VehicleForm() {
  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vehicleReg: "",
      insuranceExpiration: new Date(),
      vehicleStatus: "active",
      vehicleClass: "matatu",
    },
  });

  const onSubmit: SubmitHandler<VehicleData> = async (formData) => {
    try {
      const result = await createNewVehicleData(formData);

      if (result) {
        // Show toast notification for success
        toast.success("Vehicle created successfully!", {
          duration: 5500,
        });

        // Reset the form to its default values
        form.reset();
      } else {
        toast.error("Failed to create driver.", {
          duration: 5500,
        });
      }
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  return (
    <div className="p-5">
      <CardHeader className="h-16 text-center text-2xl font-bold py-2">
        Add New Vehicle
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* vehicle */}

          <div>
            <FormField
              control={form.control}
              name="vehicleReg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="KCDxxxxx" />
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                  <FormDescription className="text-xs">
                    Select Vehicle type. Default option is{" "}
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
                      <SelectItem value="matatu">Matatu</SelectItem>
                      <SelectItem value="minibus">Minibus</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                  <FormDescription className="text-xs">
                    Select Vehicle type. Default option is{" "}
                    <span className="text-red-300  font-medium">
                      {field.value}
                    </span>
                  </FormDescription>
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
