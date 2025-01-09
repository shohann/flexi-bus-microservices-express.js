import { Pagination } from "../utils/response";

export interface CreateCityReqDTO {
  name: string;
  lat: number;
  long: number;
}

export interface CreateCityResDTO {
  id: number;
  name: string;
  lat: number;
  long: number;
}

export interface ListCityReqDTO {
  page: number;
  size: number;
}

export interface ListCityResDTO {
  data:
    | {
        id: number;
        name: string;
      }[]
    | [];
  pagination?: Pagination;
}

// Bus Stop
export interface CreateBusStopReqDTO {
  name: string;
  lat: number;
  long: number;
}

export interface CreateBusStopResDTO {
  id: number;
  name: string;
  lat: number;
  long: number;
}

export interface ListBusStopReqDTO {
  page: number;
  size: number;
}

export interface ListBusStopResDTO {
  data:
    | {
        id: number;
        name: string;
      }[]
    | [];
  pagination?: Pagination;
}
