import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const notFoundRoutes = (req: Request, res: Response, next: NextFunction)=>{
 return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    error: ""
 })
}