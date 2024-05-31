import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.services';
import { UserValidation } from './user.validation';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utls/catchAsync';




const createStudent = catchAsync(async (req, res) => {
 
    const {password, student: studentData } = req.body;
    // const zodData = UserValidation.parse(StudentData);
    const result = await userServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: result
    });
});

export const userController = {
    createStudent,
}
