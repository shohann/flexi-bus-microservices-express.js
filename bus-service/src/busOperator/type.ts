export interface CreateBusReqDTO {
  name: string;
  logo?: string;
}

export interface CreateBusResDTO {
  id: number;
  name: string;
  logo: string | null;
}
