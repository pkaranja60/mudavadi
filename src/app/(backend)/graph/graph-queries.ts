import { gql, GraphQLClient, Variables } from "graphql-request";
import { toast } from "sonner";
import {
  DriverData,
  DriverScheduleData,
  ScheduleData,
  VehicleData,
} from "@/schema";
import config from "./config";

// const hygraph = new GraphQLClient(config.hygraphUrl);

const hygraph = new GraphQLClient(config.hygraphUrl, {
  headers: {
    Authorization: `Bearer ${config.authToken}`,
  },
});

// CREATE DRIVER DATA
const createNewDriverData = async (formData: DriverData) => {
  const variables: Variables = {
    lastName: formData.lastName,
    firstName: formData.firstName,
    phoneNumber: formData.phoneNumber,
    nationalId: formData.nationalId,
    licenseNumber: formData.licenseNumber,
    licenseClass: formData.licenseClass,
    licenseExpiration: formData.licenseExpiration,
    driverStatus: formData.driverStatus,
  };
  const mutationNewDriverData = gql`
    mutation CreateDriverData(
      $lastName: String!
      $firstName: String!
      $phoneNumber: String!
      $nationalId: String!
      $licenseNumber: String!
      $licenseClass: String!
      $licenseExpiration: Date!
      $driverStatus: String!
    ) {
      createDriver(
        data: {
          lastName: $lastName
          firstName: $firstName
          phoneNumber: $phoneNumber
          nationalId: $nationalId
          licenseNumber: $licenseNumber
          licenseClass: $licenseClass
          licenseExpiration: $licenseExpiration
          driverStatus: $driverStatus
        }
      ) {
        id
      }
    }
  `;

  try {
    return await hygraph.request(mutationNewDriverData, variables);
  } catch (error: any) {
    console.error("Error creating driver:", +error.message);
    toast.error("Error creating drivers: ", {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

// CREATE VEHICLE DATA
const createNewVehicleData = async (formData: VehicleData) => {
  const variables: Variables = {
    vehicleReg: formData.vehicleReg,
    insuranceExpiration: formData.insuranceExpiration,
    vehicleStatus: formData.vehicleStatus,
    vehicleClass: formData.vehicleClass,
  };
  const mutationNewVehicleData = gql`
    mutation CreateVehicleData(
      $vehicleReg: String!
      $insuranceExpiration: Date!
      $vehicleStatus: String!
      $vehicleClass: String!
    ) {
      createVehicle(
        data: {
          vehicleReg: $vehicleReg
          insuranceExpiration: $insuranceExpiration
          vehicleStatus: $vehicleStatus
          vehicleClass: $vehicleClass
        }
      ) {
        id
      }
    }
  `;

  try {
    return await hygraph.request(mutationNewVehicleData, variables);
  } catch (error: any) {
    console.error("Error creating driver:", +error.message);
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
        licenseClass
        licenseExpiration
        driverStatus
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
    toast.error("Error fetching drivers", {
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
    toast.error("Error fetching vehicles", {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

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
    vehicleReg: vehicleReg,
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
          driver: { connect: { Driver: { nationalId: $nationalId } } }
          vehicle: { connect: { Vehicle: { vehicleReg: $vehicleReg } } }
          slotNumber: $slotNumber
          startTime: $startTime
          scheduleDate: $scheduleDate
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
    return await hygraph.request(mutationNewSchedule, variables);
  } catch (error: any) {
    console.error("Error creating schedule:", error);
    return []; // Return empty array or handle error as needed
  }
};

// GET PER VEHICLE TYPE
const getDriverSchedules = async () => {
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
  try {
    const { schedules } = await hygraph.request<{
      schedules: DriverScheduleData[];
    }>(queryGetDriverSchedules);
    return schedules;
  } catch (error: any) {
    console.error("Error fetching schedule:", error.message);
    toast.error("Error fetching schedule", {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

// DELETE DRIVER
const deleteDriver = async (id: string) => {
  const variables: Variables = {
    id: id,
  };
  const mutationDeleteDriver = gql`
    mutation deleteDriver($id: ID!) {
      deleteDriver(where: { id: $id }) {
        id
        lastName
        licenseExpiration
        licenseNumber
        nationalId
        phoneNumber
        firstName
        driverStatus
      }
    }
  `;

  try {
    return await hygraph.request(mutationDeleteDriver, variables);
  } catch (error: any) {
    console.error("Error creating schedule:", error);
    return []; // Return empty array or handle error as needed
  }
};

// DELETE VEHICLE
const deleteVehicle = async (id: string) => {
  const variables: Variables = {
    id: id,
  };
  const mutationDeleteVehicle = gql`
    mutation deleteDriver($id: ID!) {
      deleteVehicle(where: { id: $id }) {
        id
        insuranceExpiration
        vehicleClass
        vehicleReg
        vehicleStatus
      }
    }
  `;

  try {
    return await hygraph.request(mutationDeleteVehicle, variables);
  } catch (error: any) {
    console.error("Error creating schedule:", error);
    return []; // Return empty array or handle error as needed
  }
};

// DELETE SCHEDULE
const deleteSchedule = async (id: string) => {
  const variables: Variables = {
    id: id,
  };
  const mutationDeleteSchedule = gql`
    mutation deleteSchedule($id: ID!) {
      deleteSchedule(where: { id: $id }) {
        id
        scheduleDate
        startTime
        slotNumber
        stage
      }
    }
  `;

  try {
    return await hygraph.request(mutationDeleteSchedule, variables);
  } catch (error: any) {
    console.error("Error creating schedule:", error);
    return []; // Return empty array or handle error as needed
  }
};

export {
  createNewDriverData,
  createNewVehicleData,
  getAllDrivers,
  getAllVehicles,
  createNewSchedule,
  getDriverSchedules,
  deleteDriver,
  deleteVehicle,
  deleteSchedule,
};
