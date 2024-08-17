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
import { DriverSchema, DriverData } from "@/schema";
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
import { createNewDriverData } from "@/app/(backend)/graph/graph-queries";
import DriverImageUpload from "./driverImageUpload";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useQueryClient } from "@tanstack/react-query";

const getCurrentYear = () => new Date().getFullYear();

const getYearAhead = (years = 10) => {
  const currentYear = new Date().getFullYear();
  return currentYear + years;
};

export default function DriverForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof DriverSchema>>({
    resolver: zodResolver(DriverSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      nationalId: "",
      licenseNumber: "",
      licenseClass: "matatu",
      licenseExpiration: new Date(),
      driverStatus: "active",
    },
  });

  const onSubmit: SubmitHandler<DriverData> = async (formData) => {
    try {
      const result = await createNewDriverData(formData);

      if (result) {
        await queryClient.invalidateQueries({ queryKey: ["drivers"] });
        // Show toast notification for success
        toast.success("Driver created successfully!", {
          duration: 2000,
        });
        form.reset();
      } else {
        toast.error("Failed to create driver.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error creating driver:", error);
    }
  };

  return (
    <div className="p-5">
      <CardHeader className="h-16 text-center text-2xl font-bold py-2">
        Add New Driver
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Driver */}

          <div className="flex items-center gap-x-3">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Last Name" />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="First Name" />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      country="ke"
                      enableAreaCodes={true}
                      inputStyle={{
                        height: "2.5rem",
                        width: "100%",
                      }}
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
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="5678xxxx" />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-x-3">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="744xxxx" />
                    </FormControl>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-1/2">
              <FormField
                control={form.control}
                name="licenseClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select License Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="matatu">Matatu</SelectItem>
                        <SelectItem value="minibus">Minibus</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage {...field} />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="licenseExpiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Expiration</FormLabel>
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
              name="driverStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Driver Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage {...field} />
                  <FormDescription className="text-xs">
                    Select Driver status. Default option is{" "}
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
