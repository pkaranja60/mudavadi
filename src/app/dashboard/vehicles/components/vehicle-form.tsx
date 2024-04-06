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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleSchema } from "@/schema";
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

export default function VehicleForm() {
  const form = useForm<z.infer<typeof VehicleSchema>>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vehicleReg: "",
      insuranceExpiration: new Date(),
      vehicleStatus: "active",
      VehicleType: "class I",
    },
  });

  const onSubmit = () => {
    console.log("submitted");
  };
  return (
    <Card className="p-5">
      <CardHeader className="text-center text-lg font-bold">
        Add New Vehicle
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="VehicleType"
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
                      <SelectItem value="class I">class I</SelectItem>
                      <SelectItem value="class II">class II</SelectItem>
                      <SelectItem value="class III">class III</SelectItem>
                      <SelectItem value="class IV">class IV</SelectItem>
                      <SelectItem value="class V">class V</SelectItem>
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
            <Button className="w-full h-14 bg-[#fdb255] hover:bg-slate-400">Submit</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
