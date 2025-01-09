import { z, object } from "zod";

export const validateCreateCity = z.object({
  body: object({
    name: z
      .string()
      .min(3, { message: "Content must be at least 3 characters long" })
      .max(100, { message: "Content must be 100 characters or less" }),
    lat: z.number(),
    long: z.number(),
  }),
});

export type CreateCity = z.infer<typeof validateCreateCity>["body"];

export const validateCreateBusStop = z.object({
  body: object({
    name: z
      .string()
      .min(3, { message: "Content must be at least 3 characters long" })
      .max(100, { message: "Content must be 100 characters or less" }),
    lat: z.number(),
    long: z.number(),
  }),
});

export type CreateBusStop = z.infer<typeof validateCreateBusStop>["body"];
