import { Response } from "express";

type Tresponse<T> = { statusCode: number, message: string, success: boolean, data: T }
const sendResponse = <T>(res: Response, data: Tresponse<T>)=> {
    res.status(data?.statusCode).json({
        success: data.success,
        msg: data.message,
        data: data.data
    });
};

export default sendResponse;