import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utls/catchAsync';



const getAllStudents = catchAsync(async (req, res) => {
    const result = await studentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All users displayed!",
      data: result
    });
  });

const getSingleStudents = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Retrived successfull",
      data: result
    });
});

const deleteStudent  = catchAsync(async(req, res)=>{
    const { studentId } = req.params;
    const result = await studentServices.isDeleteStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    }); 
});

// update students
const updateStudent = catchAsync(async (req, res)=>{
    const {studentId} = req.params;
    const updateData = req.body;
    const result = await studentServices.updateStudentFromDB(studentId, updateData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: result
    });
});


export const studentController = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent, 
  updateStudent
};

