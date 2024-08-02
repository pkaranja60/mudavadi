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

const getCurrentYear = () => new Date().getFullYear();

const getYearAhead = (years = 10) => {
  const currentYear = new Date().getFullYear();
  return currentYear + years;
};

export default function DriverForm() {
  const form = useForm<z.infer<typeof DriverSchema>>({
    resolver: zodResolver(DriverSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      nationalId: "",
      licenseNumber: "",
      licenseExpiration: new Date(),
      driverStatus: "active",
      vehicleReg: "",
      insuranceExpiration: new Date(),
      vehicleStatus: "active",
      vehicleClass: "Matatu",
    },
  });

  const onSubmit: SubmitHandler<DriverData> = async (formData) => {
    try {
      const result = await createNewDriverData(formData);

      console.log(result);
      if (result) {
        // Show toast notification for success
        toast.success("Driver created successfully!", {
          duration: 5500,
        });
        console.log("Driver created successfully!");
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
        Add New Driver
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-3">
            {/* Driver */}
            <div className="w-1/2">
              <div>
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
              <div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="First Name"
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

              <div>
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

              <div>
                <FormField
                  control={form.control}
                  name="licenseExpiration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Expiration</FormLabel>
                  
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
                          <SelectItem value="active">active</SelectItem>
                          <SelectItem value="suspended">suspended</SelectItem>
                          <SelectItem value="inactive">inactive</SelectItem>
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
            </div>

            {/* vehicle */}
            <div className="w-1/2">
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
                      <FormLabel>Vehicle Type</FormLabel>
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
                          <SelectItem value="inactive">inactive</SelectItem>
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
                          <SelectItem value="Matatu">Matatu</SelectItem>
                          <SelectItem value="Minibus">Minibus</SelectItem>
                          <SelectItem value="Bus">Bus</SelectItem>
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
            </div>
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
