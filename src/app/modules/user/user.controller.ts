import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';
import { UserValidation } from './user.validation';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';




const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {password, student: studentData } = req.body;
    // const zodData = UserValidation.parse(StudentData);
    const result = await userServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
    createStudent,
}
