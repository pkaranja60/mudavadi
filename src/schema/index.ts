import * as z from "zod";

const getCurrentYear = () => new Date().getFullYear();

const phoneNumberValidation = z
  .string()
  .regex(/^254\d{9}$/, "Phone number must start with 254 and be max 12 digits");

export const DriverSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  nationalId: z.string().min(2, { message: "National ID is required" }),
  phoneNumber: phoneNumberValidation,
  licenseNumber: z.string().min(2, {
    message: "License number is required",
  }),
  licenseExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Insurance expiration date is required",
  }),
  driverStatus: z.enum(["active", "suspended", "inactive"]).default("active"),
});

export const VehicleSchema = z.object({
  vehicleReg: z.string().min(1, {
    message: "Vehicle registration is required",
  }),
  insuranceExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Insurance expiration date is required",
  }),
  vehicleStatus: z.enum(["active", "inactive"]),
  vehicleClass: z.enum(["I", "II", "III", "IV", "V"]),
});

export const DriverDataSchema = z.object({
  id: z.string().nullable(),
  lastName: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  nationalId: z.string(),
  licenseNumber: z.string(),
  licenseExpiration: z.date(),
  driverStatus: z.string(),
});

export const VehicleDataSchema = z.object({
  vehicleReg: z.string(),
  insuranceExpiration: z.date(),
  vehicleStatus: z.string(),
  vehicleClass: z.string(),
});

export type DriverData = z.infer<typeof DriverDataSchema>;
export type VehicleData = z.infer<typeof VehicleDataSchema>;
