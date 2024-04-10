import { GraphQLClient, Variables  } from "graphql-request";
import config from "@/backend/config";
import { gql } from "graphql-request";
import { toast } from "sonner";


const hygraph = new GraphQLClient(config.hygraphUrl);

interface Driver {
    id: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  nationalId: string;
  licenseNumber: string;
  licenseExpiration: Date;
  driverStatus: string;
}

interface FormDriverData {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  nationalId: string;
  licenseNumber: string;
  licenseExpiration: Date;
  driverStatus: string;
}
interface FormVehicleData {
    vehicleReg: string;
  insuranceExpiration: Date;
  vehicleStatus: string;
  vehicleClass: string;
}

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
      }
    }
  `;

  try {
    const { drivers } = await hygraph.request<{ drivers: Driver[] }>(
      queryGetDrivers
    );
    return drivers;
  } catch (error:any) {
    console.error("Error fetching drivers:", error);
    toast.error("Error fetching drivers: " + error.message, {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

const createNewDriver = async (formData: FormDriverData) => {
    const variables: Variables = {
        lastName: formData.lastName,
        firstName: formData.firstName,
        phoneNumber: formData.phoneNumber,
        nationalId: formData.nationalId,
        licenseNumber: formData.licenseNumber,
        licenseExpiration: formData.licenseExpiration,
        driverStatus: formData.driverStatus,
      };
  const mutationNewDriver = gql`
    mutation CreateDriver(
      $lastName: String!
      $firstName: String!
      $phoneNumber: String!
      $nationalId: String!
      $licenseNumber: String!
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
          licenseExpiration: $licenseExpiration
          driverStatus: $driverStatus
        }
      ) {
        id

      }
    }
  `;

  try {
    const result = await hygraph.request(mutationNewDriver, variables);
    return result;
    
  } catch (error:any) {
    console.error("Error creating driver:", error);
    toast.error("Error creating drivers: " + error.message, {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

const createNewVehicle = async (formData: FormVehicleData) => {
    const variables: Variables = {
        vehicleReg: formData.vehicleReg, 
        insuranceExpiration: formData.insuranceExpiration,
        vehicleStatus: formData.vehicleStatus,
        vehicleClass: formData.vehicleClass,
      };
  const mutationNewVehicle = gql`
    mutation CreateVehicle(
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
    const result = await hygraph.request(mutationNewVehicle, variables);
    return result;
    
  } catch (error:any) {
    console.error("Error creating driver:", error);
    toast.error("Error creating drivers: " + error.message, {
      duration: 5500,
    });
    return []; // Return empty array or handle error as needed
  }
};

export { getAllDrivers, createNewDriver, createNewVehicle };
