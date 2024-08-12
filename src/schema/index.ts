import * as z from "zod";

const getCurrentYear = () => new Date().getFullYear();

// Custom phone number validator
const phoneNumberValidation = z.string().regex(/^254\d{9}$/, "Required");

// Custom slot number validator
const validateNumber = z
  .string()
  .regex(/^([1-9]|1\d|20)$/, "Range between 1-20");

// Custom DateTime validator
const dateTimeRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?$/;

const dateTimeSchema = z.string().refine((value) => dateTimeRegex.test(value));

const ScheduleDriverSchema = z.object({
  id: z.string(),
  lastName: z.string(),
  firstName: z.string(),
  licenseNumber: z.string(),
});

const ScheduleVehicleSchema = z.object({
  id: z.string(),
  vehicleReg: z.string(),
  vehicleClass: z.string(),
});

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
  licenseClass: z.enum(["matatu", "minibus", "bus"]),
  licenseExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  driverStatus: z.enum(["active", "suspended", "inactive"]).default("active"),
});

export const VehicleSchema = z.object({
  vehicleReg: z.string().min(1, {
    message: "Required",
  }),
  insuranceExpiration: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  vehicleStatus: z.enum(["active", "inactive"]),
  vehicleClass: z.enum(["matatu", "minibus", "bus"]),
});

export const ScheduleSchema = z.object({
  scheduleTime: z.date().min(new Date(getCurrentYear(), 0, 1), {
    message: "Required",
  }),
  slotNumber: validateNumber,
});

export const DriverDataSchema = z.object({
  id: z.string().optional(),
  lastName: z.string(),
  firstName: z.string(),
  phoneNumber: z.string(),
  nationalId: z.string(),
  licenseNumber: z.string(),
  licenseClass: z.string(),
  licenseExpiration: z.date(),
  driverStatus: z.string(),
});

export const VehicleDataSchema = z.object({
  id: z.string().optional(),
  vehicleReg: z.string(),
  insuranceExpiration: z.date(),
  vehicleStatus: z.string(),
  vehicleClass: z.string(),
});

export const ScheduleDataSchema = z.object({
  scheduledTime: dateTimeSchema,
  slotNumber: z.string(),
  driverId: z.string(),
  vehicleId: z.string(),
  vehicleReg: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const DriverScheduleSchema = z.object({
  id: z.string(),
  scheduleDate: z.date(),
  startTime: z.string(),
  slotNumber: z.string(),
  driver: ScheduleDriverSchema,
  vehicle: ScheduleVehicleSchema,
});

export type DriverData = z.infer<typeof DriverDataSchema>;
export type VehicleData = z.infer<typeof VehicleDataSchema>;
export type ScheduleData = z.infer<typeof ScheduleDataSchema>;
export type DriverScheduleData = z.infer<typeof DriverScheduleSchema>;
