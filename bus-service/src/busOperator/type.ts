import { Pagination } from "../utils/response";

export interface CreateBusReqDTO {
  name: string;
  logo?: string;
}

export interface CreateBusResDTO {
  id: number;
  name: string;
  logo: string | null;
}

export interface ListBusOperatorsReqDTO {
  page: number;
  size: number;
}

export interface ListBusOperatorResDTO {
  data:
    | {
        id: number;
        name: string;
      }[]
    | [];
  pagination?: Pagination;
}
