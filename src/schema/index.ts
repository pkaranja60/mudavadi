import * as z from "zod";

const VehicleDriverSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  nationalId: z.string(),
});

const ActiveVehicleSchema = z.object({
  id: z.string(),
  vehicleReg: z.string(),
  vehicleClass: z.string(),
});

const getCurrentYear = () => new Date().getFullYear();

const phoneNumberValidation = z.string().regex(/^254\d{9}$/, "Required");

export const DriverSchema = z.object({
  firstName: z.string().min(1, {
    message: "Required",
  }),
  lastName: z.string().min(1, {
    message: "Required",
  }),
  nationalId: z.string().min(2, { message: "Required" }),
  phoneNumber: phoneNumberValidation,
  licenseNumber: z.string().min(2, {
    message: "Required",
  }),
  licenseExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  driverStatus: z.enum(["active", "suspended", "inactive"]).default("active"),
  vehicleReg: z.string().min(1, {
    message: "Required",
  }),
  insuranceExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  vehicleStatus: z.enum(["active", "inactive"]),
  vehicleClass: z.enum(["I", "II", "III", "IV", "V"]),
});

export const ScheduleSchema = z.object({
  driver: z.string().min(1, {
    message: "Required",
  }),
  scheduleDateTime: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  vehicle: z.string().min(1, {
    message: "Required",
  }),
});

export const DriverDataSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  nationalId: z.string(),
  licenseNumber: z.string(),
  licenseExpiration: z.date(),
  driverStatus: z.string(),
  vehicleReg: z.string(),
  insuranceExpiration: z.date(),
  vehicleStatus: z.string(),
  vehicleClass: z.string(),
});

export const VehicleDataSchema = z.object({
  vehicleReg: z.string(),
  insuranceExpiration: z.date(),
  vehicleStatus: z.string(),
  vehicleClass: z.string(),
  driver: VehicleDriverSchema,
});

export const ActiveDriverDataSchema = z.object({
  id: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  licenseNumber: z.string(),
  vehicle: ActiveVehicleSchema,
});

export type DriverData = z.infer<typeof DriverDataSchema>;
export type VehicleData = z.infer<typeof VehicleDataSchema>;
export type ActiveDriverData = z.infer<typeof ActiveDriverDataSchema>;
