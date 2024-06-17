import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.services';
import { UserValidation } from './user.validation';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utls/catchAsync';


// create students
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
// create faculty
const createFaculty = catchAsync(async (req, res) => {
 
    const {password, faculty: facultyData } = req.body;
    // const zodData = UserValidation.parse(StudentData);
    const result = await userServices.createFacultyIntoDB(password, facultyData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty created successfully",
      data: result
    });
});

export const userController = {
    createStudent,
    createFaculty,
}
