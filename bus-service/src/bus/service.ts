import { prisma } from "../services/dbInit";
import {
  CreateBusReqDTO,
  GetBusResDTO,
  ListBusDTO,
  ListBusResDTO,
  UpdateBusDTO,
  Seat,
  SeatResDTO,
  SeatReqDTO,
} from "./type";
import { AppError } from "../utils/error-handling/AppError";
import { HTTP_ERRORS } from "../utils/error-handling/error-codes";
import { calculatePagination } from "../utils/response";

export const createBus = async (data: CreateBusReqDTO) => {
  const { busModel, busNumber, busOperatorId, busType } = data;

  const validOperator = await prisma.busOperator.findUnique({
    where: { id: busOperatorId },
  });
  if (!validOperator) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus operator with id ${busOperatorId} not found`,
      HTTP_ERRORS.NotFound.code
    );
  }

  const busOperators = await prisma.bus.create({
    data: {
      bus_model: busModel,
      bus_number: busNumber,
      bus_operator_id: busOperatorId,
      bus_type: busType,
    },
  });

  await prisma.seat.createMany({
    data: data.seats.map((seat) => ({
      bus_id: busOperators.id,
      seat_number: seat.seatNumber,
      seat_col: seat.seatCol,
      seat_row: seat.seatRow,
    })),
  });

  return busOperators;
};

export const updateSeatById = async (data: SeatReqDTO) => {
  const validSeat = await prisma.seat.findUnique({
    where: {
      id: data.id,
      bus_id: data.busId,
    },
  });

  if (!validSeat) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Seat with id ${data.id} not found`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.seat.update({
    where: {
      id: data.id,
    },
    data: {
      seat_number: data.seatNumber,
      seat_col: data.seatCol,
      seat_row: data.seatRow,
    },
  });
};

export const disableBus = async (id: number) => {
  const bus = await prisma.bus.findUnique({
    where: {
      id,
    },
  });

  if (!bus) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus with id ${id} not found`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.bus.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  });
};

export const updateBus = async (data: UpdateBusDTO): Promise<void> => {
  const { id, busModel, busNumber, busType, status } = data;

  const bus = await prisma.bus.findUnique({
    where: {
      id,
    },
  });

  if (!bus) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus with id ${id} not found`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.bus.update({
    where: {
      id,
    },
    data: {
      bus_model: busModel,
      bus_number: busNumber,
      bus_type: busType,
      status,
    },
  });
};

export const getBus = async (id: number): Promise<GetBusResDTO> => {
  const bus = await prisma.bus.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      bus_model: true,
      bus_type: true,
      bus_number: true,
      bus_operator_id: true,
      status: true,
      seats: true,
    },
  });

  if (!bus) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus with id ${id} not found`,
      HTTP_ERRORS.NotFound.code
    );
  }

  const camelCaseBus = {
    id: bus.id,
    busModel: bus.bus_model,
    busType: bus.bus_type,
    busNumber: bus.bus_number,
    busOperatorId: bus.bus_operator_id,
    status: bus.status,
    seats: bus.seats,
  };

  return camelCaseBus;
};

export const getBuses = async (data: ListBusDTO): Promise<ListBusResDTO> => {
  const skip = (data.page - 1) * data.size;
  const take = data.size;

  const totalBus = await prisma.bus.count();
  const buses = await prisma.bus.findMany({
    skip,
    take,
    select: {
      id: true,
      bus_type: true,
      bus_number: true,
      bus_operator_id: true,
      bus_model: true,
      status: true,
    },
  });

  const camelCaseBuses = buses.map((bus) => ({
    id: bus.id,
    busType: bus.bus_type,
    busNumber: bus.bus_number,
    busOperatorId: bus.bus_operator_id,
    busModel: bus.bus_model,
    status: bus.status,
  }));

  const pagination = calculatePagination(data.page, data.size, totalBus);

  return {
    data: camelCaseBuses,
    pagination,
  };
};
