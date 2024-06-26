import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// student validaton
export const validationRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //validation
        try {
            await schema.parseAsync({
                body: req.body
            })
            next();

        } catch (error) {
            next(error);
        }
    }
}