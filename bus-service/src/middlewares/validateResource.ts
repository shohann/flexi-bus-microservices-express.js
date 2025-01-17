import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

export const validateAndParse =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse({
        body: req.body,
      });

      req.body = data.body;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }
      next(error);
    }
  };

export const validateParams =
  (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
      });

      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (e: any) {
      res.status(400).send(e.errors); // TODO: Global error handler needs to be called
      // return res.status(400).send(e.errors);
    }
  };

export default validate;
