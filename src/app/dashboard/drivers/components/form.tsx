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
import {
  DriverData,
  DriverDataCopy,
  DriverSchema,
  DriverVehicleSchema,
} from "@/schema";
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
import { createNewDriver, createNewDriverVehicle } from "@/backend/ApiConfig";
import DriverImageUpload from "./driverImageUpload";
import { useState } from "react";

export default function FormT() {
  const form = useForm<z.infer<typeof DriverVehicleSchema>>({
    resolver: zodResolver(DriverVehicleSchema),
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
      vehicleClass: "I",
    },
  });

  const onSubmit: SubmitHandler<DriverDataCopy> = async (formData) => {
    try {
      const result = await createNewDriverVehicle(formData);

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
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-1/2">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Last Name"
                            />
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
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="07xxxxxxx"
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
                          <Input
                            {...field}
                            type="text"
                            placeholder="5678xxxx"
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
              <div>
                <div>
                  <FormField
                    control={form.control}
                    name="vehicleReg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Registration Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="KCDxxxxx"
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
                          Select Vehicle staus. Default option is{" "}
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
