import { prisma } from "../services/dbInit";
import {
  CreateBusReqDTO,
  CreateBusResDTO,
  ListBusOperatorResDTO,
  ListBusOperatorsReqDTO,
} from "./type";
import { AppError } from "../utils/error-handling/AppError";
import { HTTP_ERRORS } from "../utils/error-handling/error-codes";
import { calculatePagination } from "../utils/response";

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

  if (data.name) {
    const isUnique = await checkUniqueBusOperator(data.name);

    if (isUnique === false) {
      throw new AppError(
        HTTP_ERRORS.BadRequest.name,
        `Bus operator name already exists`,
        HTTP_ERRORS.BadRequest.code
      );
    }
  }

  const updatedBusOperator = await prisma.busOperator.update({
    where: {
      id,
    },
    data,
  });

  return updatedBusOperator;
};

export const checkUniqueBusOperator = async (
  name: string
): Promise<boolean> => {
  const busOperator = await prisma.busOperator.findUnique({
    where: {
      name: name,
    },
  });

  if (busOperator) {
    return false;
  } else {
    return true;
  }
};

export const listBusOperators = async (
  data: ListBusOperatorsReqDTO
): Promise<ListBusOperatorResDTO> => {
  if (!data.page && !data.size) {
    data.page = 1;
    data.size = 10;
  }

  const skip = (data.page - 1) * data.size;
  const take = data.size;

  const totalBusOperators = await prisma.busOperator.count();
  const busOperators = await prisma.busOperator.findMany({
    skip,
    take,
  });

  const pagination = calculatePagination(
    data.page,
    data.size,
    totalBusOperators
  );

  return {
    data: busOperators,
    pagination,
  };
};
