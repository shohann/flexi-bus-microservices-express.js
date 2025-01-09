import { z, object, string } from "zod";

export enum BusType {
  AC = "AC",
  NON_AC = "NON_AC",
}

export const validateCreateBus = z.object({
  body: object({
    busType: z.enum([BusType.AC, BusType.NON_AC]),
    busNumber: z.string(),
    busOperatorId: z.number().positive(),
    busModel: string(),
  }),
});

export type CreateBus = z.infer<typeof validateCreateBus>["body"];
