import { prisma } from "../services/dbInit";
import {
  CreateCityReqDTO,
  CreateCityResDTO,
  ListCityResDTO,
  ListCityReqDTO,
  CreateBusStopReqDTO,
  CreateBusStopResDTO,
  ListBusStopReqDTO,
  ListBusStopResDTO,
} from "./type";
import { AppError } from "../utils/error-handling/AppError";
import { HTTP_ERRORS } from "../utils/error-handling/error-codes";
import { calculatePagination } from "../utils/response";

export const createCity = async (data: CreateCityReqDTO) => {
  const city = await prisma.city.create({
    data,
  });

  return city;
};

export const createBusStop = async (data: CreateBusStopReqDTO) => {
  const busStop = await prisma.city.create({
    data,
  });

  return busStop;
};

export const getCityById = async (id: number): Promise<CreateCityResDTO> => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
  });

  if (!city) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `City is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  return city;
};

export const getBusStopById = async (
  id: number
): Promise<CreateBusStopResDTO> => {
  const busStop = await prisma.busStop.findUnique({
    where: {
      id,
    },
  });

  if (!busStop) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus stop is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  return busStop;
};

export const deleteCityById = async (id: number) => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
  });

  if (!city) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `City is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.city.delete({
    where: {
      id,
    },
  });
};

export const deleteBusStopById = async (id: number) => {
  const busStop = await prisma.busStop.findUnique({
    where: {
      id,
    },
  });

  if (!busStop) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus stop is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.busStop.delete({
    where: {
      id,
    },
  });
};

export const listCities = async (
  data: ListCityReqDTO
): Promise<ListCityResDTO> => {
  if (!data.page && !data.size) {
    data.page = 1;
    data.size = 10;
  }
  const { page, size } = data;
  const skip = (data.page - 1) * data.size;
  const take = data.size;

  const count = await prisma.city.count();
  const cities = await prisma.city.findMany({
    skip: skip,
    take: take,
  });

  return {
    data: cities,
    pagination: calculatePagination(page, size, count),
  };
};

export const listBusStops = async (
  data: ListBusStopReqDTO
): Promise<ListBusStopResDTO> => {
  if (!data.page && !data.size) {
    data.page = 1;
    data.size = 10;
  }
  const { page, size } = data;
  const skip = (data.page - 1) * data.size;
  const take = data.size;

  const count = await prisma.busStop.count();
  const busStops = await prisma.busStop.findMany({
    skip,
    take,
  });

  return {
    data: busStops,
    pagination: calculatePagination(page, size, count),
  };
};

export const updateCity = async (id: number, data: CreateCityReqDTO) => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
  });

  if (!city) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `City is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  const updatedCity = await prisma.city.update({
    where: {
      id,
    },
    data,
  });

  return updatedCity;
};

export const updateBusStop = async (id: number, data: CreateBusStopReqDTO) => {
  const busStop = await prisma.busStop.findUnique({
    where: {
      id,
    },
  });

  if (!busStop) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus stop is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  const updatedBusStop = await prisma.busStop.update({
    where: {
      id,
    },
    data,
  });

  return updatedBusStop;
};
