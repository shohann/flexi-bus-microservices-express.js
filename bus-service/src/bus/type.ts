import { Pagination } from "../utils/response";
import { BusType } from "@prisma/client";

export interface CreateBusReqDTO {
  busType: BusType;
  busNumber: string;
  busOperatorId: number;
  busModel: string;
}

export interface CreateBusResDTO {
  id: number;
  busType: BusType;
  busNumber: string;
  busOperatorId: number;
  busModel: string;
}

export interface UpdateBusDTO {
  id: number;
  busType: BusType;
  busNumber: string;
  busModel: string;
  status: boolean;
}

export interface ListBusDTO {
  page: number;
  size: number;
}

export interface ListBusResDTO {
  data:
    | {
        id: number;
        busType: BusType;
        busNumber: string;
        busOperatorId: number;
        busModel: string;
        status: boolean;
      }[]
    | [];
  pagination?: Pagination;
}

export interface GetBusResDTO {
  id: number;
  busType: BusType;
  busNumber: string;
  busOperatorId: number;
  busModel: string;
  status: boolean;
}
