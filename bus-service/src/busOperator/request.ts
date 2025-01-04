import { z, object } from "zod";

export const validateCreateBusOperator = z.object({
  body: object({
    name: z
      .string()
      .min(8, { message: "Content must be at least 8 characters long" })
      .max(100, { message: "Content must be 100 characters or less" }),
    logo: z
      .string()
      .min(8, { message: "Content must be at least 8 characters long" })
      .max(100, { message: "Content must be 100 characters or less" })
      .optional(),
  }),
});

export type CreateBusOperator = z.infer<
  typeof validateCreateBusOperator
>["body"];
