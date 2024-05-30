import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.services';
import { StudentValidationSchema } from './zodValidation';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All users displayed!",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Retrived successfull",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const { studentId } = req.params;
    const result = await studentServices.isDeleteStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// update students
const updateStudent = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {studentId} = req.params;
    const updateData = req.body;
    console.log(studentId, updateData);
    const result = await studentServices.updateStudentFromDB(studentId, updateData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: result
    });
  } catch (error: any) {
    next(error);
  }
}


export const studentController = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent, 
  updateStudent
};

