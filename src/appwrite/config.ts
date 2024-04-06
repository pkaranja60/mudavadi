import config from "@/conf/config";
import { Client, Databases, ID } from "appwrite";

export interface CreateDriverParams {
  firstName: string;
  lastName: string;
  nationalId: string;
  phoneNumber: string;
  licenseNumber: string;
  licenseExpiration: Date;
  driverStatus: String;
}
interface CreateVehicleParams {
  vehicleReg: String;
  insuranceExpiration: Date;
  vehicleStatus: String;
  VehicleType: String;
}

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async getDriver() {
    try {
      this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteDriverCollectionId,
        ID.unique()
      );
    } catch (error) {
      console.log("Appwrite service :: getDrivers() ::", error);
      return false;
    }
  }

  async createDriver({
    firstName,
    lastName,
    nationalId,
    phoneNumber,
    licenseNumber,
    licenseExpiration,
    driverStatus,
  }: CreateDriverParams) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteDriverCollectionId,
        ID.unique(),
        {
          firstName,
          lastName,
          nationalId,
          phoneNumber,
          licenseNumber,
          licenseExpiration,
          driverStatus,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createDriver() :: ", error);
      return false;
    }
  }

  async createVehicle({
    vehicleReg,
    insuranceExpiration,
    vehicleStatus,
    VehicleType,
  }: CreateVehicleParams) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteDriverCollectionId,
        ID.unique(),
        {
          vehicleReg,
          insuranceExpiration,
          vehicleStatus,
          VehicleType,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createDriver() :: ", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
