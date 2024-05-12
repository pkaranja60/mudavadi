import { GraphQLClient, Variables } from "graphql-request";
import config from "@/backend/config";
import { gql } from "graphql-request";
import { toast } from "sonner";
import { ActiveDriverData, DriverData, DriverScheduleData, ScheduleData, VehicleData } from "@/schema";

const hygraph = new GraphQLClient(config.hygraphUrl);

// CREATE DRIVER AND VEHICLE DATA
const createNewDriverData = async (formData: DriverData) => {
  const variables: Variables = {
    lastName: formData.lastName,
    firstName: formData.firstName,
    phoneNumber: formData.phoneNumber,
    nationalId: formData.nationalId,
    licenseNumber: formData.licenseNumber,
    licenseExpiration: formData.licenseExpiration,
    driverStatus: formData.driverStatus,
    vehicleReg: formData.vehicleReg,
    insuranceExpiration: formData.insuranceExpiration,
    vehicleStatus: formData.vehicleStatus,
    vehicleClass: formData.vehicleClass,
  };
  const mutationNewDriverData = gql`
    mutation CreateDriverData(
      $lastName: String!
      $firstName: String!
      $phoneNumber: String!
      $nationalId: String!
      $licenseNumber: String!
      $licenseExpiration: Date!
      $driverStatus: String!
      $vehicleReg: String!
      $insuranceExpiration: Date!
      $vehicleStatus: String!
      $vehicleClass: String!
    ) {
      createDriver(
        data: {
          lastName: $lastName
          firstName: $firstName
          phoneNumber: $phoneNumber
          nationalId: $nationalId
          licenseNumber: $licenseNumber
          licenseExpiration: $licenseExpiration
          driverStatus: $driverStatus
          vehicle: {
            create: {
              vehicleReg: $vehicleReg
              insuranceExpiration: $insuranceExpiration
              vehicleStatus: $vehicleStatus
              vehicleClass: $vehicleClass
            }
          }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await hygraph.request(mutationNewDriverData, variables);
    return result;
  } catch (error: any) {
    console.error("Error creating driver:", + error.message);
    toast.error("Error creating drivers: ", {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

// GET ALL DRIVERS
const getAllDrivers = async () => {
  const queryGetDrivers = gql`
    query Drivers {
      drivers {
        id
        lastName
        firstName
        phoneNumber
        nationalId
        licenseNumber
        licenseExpiration
        driverStatus
        vehicle {
      vehicleReg
    }
      }
    }
  `;

  try {
    const { drivers } = await hygraph.request<{ drivers: DriverData[] }>(
      queryGetDrivers
    );
    return drivers;
  } catch (error: any) {
    console.error("Error fetching drivers:", error.message);
    toast.error("Error fetching drivers" , {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

// GET ALL VEHICLES
const getAllVehicles = async () => {
  const queryGetVehicles = gql`
    query vehicles {
      vehicles {
    id
    vehicleReg
    insuranceExpiration
    vehicleStatus
    vehicleClass
    driver {
      lastName
      firstName
      nationalId
    }
  }
    }
  `;

  try {
    const { vehicles } = await hygraph.request<{ vehicles: VehicleData[] }>(
      queryGetVehicles
    );
    return vehicles;
  } catch (error: any) {
    console.error("Error fetching drivers:", error.message);
    toast.error("Error fetching vehicles" , {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

// GET ACTIVE DRIVERS AND VEHICLE
const getActiveDriverVehicle = async ()=>{
  const queryGetActiveDriverVehicle = gql`
  query activeDriverVehicle {
  drivers(
    where: {driverStatus: "active", AND: {vehicle: {vehicleStatus: "active"}}}
  ) {
    id
    lastName
    firstName
    licenseNumber
    vehicle {
      id
      vehicleReg
      vehicleClass
    }
  }
}
  `;
  try{
    const { drivers } = await hygraph.request<{ drivers: ActiveDriverData[] }>(
      queryGetActiveDriverVehicle
    );
    return drivers;
  }catch(error: any){
    console.error("Error fetching drivers:", error.message);
    return []; // Return empty array or handle error as needed
  }
}

// CREATE DRIVER AND VEHICLE DATA
const createNewSchedule = async (
  formData: ScheduleData,
  nationalId: string,
  vehicleReg: string
) => {
  const variables: Variables = {
    scheduleDate: formData.scheduleDate,
    startTime: formData.startTime,
    slotNumber: formData.slotNumber,
    nationalId: nationalId,
    vehicleReg: vehicleReg

  };
  const mutationNewSchedule = gql`
    mutation createSchedule(
      $scheduleDate: Date!
      $startTime: String!
      $slotNumber: String!
      $nationalId: String!
      $vehicleReg: String!
    ) {
      createSchedule(
    data: {
      driver: {connect: {Driver: {nationalId: $nationalId}}},
      vehicle: {connect: {Vehicle: {vehicleReg: $vehicleReg}}},
      slotNumber: $slotNumber,
      startTime: $startTime, 
      scheduleDate: $scheduleDate,   
       }
  ) {
    id
    scheduleDate
    startTime
    slotNumber
  }
    }
  `;

  try {
    const result = await hygraph.request(mutationNewSchedule, variables);
    return result;
  } catch (error: any) {
    console.error("Error creating schedule:", error);
    return []; // Return empty array or handle error as needed
  }
};

// GET PER VEHICLE TYPE
const getDriverSchedules = async ()=>{
  const queryGetDriverSchedules = gql`
  query schedules {
    schedules {
    id
    scheduleDate
    startTime
    slotNumber
    driver {
      ... on Driver {
        lastName
        firstName
        licenseNumber
      }
    }
    vehicle {
      ... on Vehicle {
        vehicleReg
        vehicleClass
      }
    }
  }
}
  `;
  try{
    const { schedules } = await hygraph.request<{ schedules: DriverScheduleData[] }>(
      queryGetDriverSchedules
    );
    return schedules;
  }catch(error: any){
    console.error("Error fetching schedule:", error.message);
    toast.error("Error fetching schedule" , {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
}

// GET ALL DRIVERS & VEHICLES FOR EXCEL
const getAllDriversVehicles = async () => {
  const queryAllGetDriversVehicles = gql`
  query Drivers {
    drivers {
      id
      lastName
      firstName
      phoneNumber
      nationalId
      licenseNumber
      licenseExpiration
      driverStatus
      vehicle {
        vehicleReg
        insuranceExpiration
        vehicleStatus
        vehicleClass
      }
    }
  }
  `;

  try {
    const { drivers } = await hygraph.request<{ drivers: DriverData[] }>(
      queryAllGetDriversVehicles
    );
    return drivers;
  } catch (error: any) {
    console.error("Error fetching drivers:", error.message);
    return []; // Return empty array or handle error as needed
  }
};


export {
  createNewDriverData,
  getAllDrivers,
  getAllVehicles,
  getActiveDriverVehicle,
  createNewSchedule,
  getDriverSchedules,
  getAllDriversVehicles,
};
