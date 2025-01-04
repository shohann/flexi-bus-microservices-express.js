import { prisma } from "../services/dbInit";
import { CreateBusReqDTO, CreateBusResDTO } from "./type";
import { AppError } from "../utils/error-handling/AppError";
import { HTTP_ERRORS } from "../utils/error-handling/error-codes";

export const createBusOperators = async (data: CreateBusReqDTO) => {
  const busOperators = await prisma.busOperator.create({
    data,
  });

  return busOperators;
};

export const getBusOperatorById = async (
  id: number
): Promise<CreateBusResDTO | null> => {
  const busOperator = await prisma.busOperator.findUnique({
    where: {
      id,
    },
  });

  if (!busOperator) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus operator is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  return busOperator;
};

export const deleteBusOperatorById = async (id: number) => {
  const busOperator = await prisma.busOperator.findUnique({
    where: {
      id,
    },
  });

  if (!busOperator) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus operator is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  await prisma.busOperator.delete({
    where: {
      id,
    },
  });
};

export const updateBusOperatorById = async (
  id: number,
  data: CreateBusReqDTO
): Promise<CreateBusResDTO> => {
  const busOperator = await prisma.busOperator.findUnique({
    where: {
      id,
    },
  });

  if (!busOperator) {
    throw new AppError(
      HTTP_ERRORS.NotFound.name,
      `Bus operator is unavailable`,
      HTTP_ERRORS.NotFound.code
    );
  }

  const updatedBusOperator = await prisma.busOperator.update({
    where: {
      id,
    },
    data,
  });

  return updatedBusOperator;
};
