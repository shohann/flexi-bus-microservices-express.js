import { z, object, string } from "zod";

export enum BusType {
  AC = "AC",
  NON_AC = "NON_AC",
}

export const seatSchema = z.object({
  seatNumber: z.string(),
  seatCol: z.number().positive(),
  seatRow: z.number().positive(),
});

const uniqueSeatsArray = z.array(seatSchema).refine(
  (seats) => {
    const seatNumbers = new Set();
    const seatPositions = new Set();

    for (const seat of seats) {
      if (seatNumbers.has(seat.seatNumber)) {
        return false;
      }
      seatNumbers.add(seat.seatNumber);

      const positionKey = `${seat.seatRow}-${seat.seatCol}`;
      if (seatPositions.has(positionKey)) {
        return false;
      }
      seatPositions.add(positionKey);
    }

    return true;
  },
  {
    message:
      "Each seat number and seat position (row and column) must be unique",
  }
);

export const validateCreateBus = z.object({
  body: object({
    busType: z.enum([BusType.AC, BusType.NON_AC]),
    busNumber: z.string(),
    busOperatorId: z.number().positive(),
    busModel: string(),
    seats: uniqueSeatsArray,
  }),
});

export type CreateBus = z.infer<typeof validateCreateBus>["body"];
