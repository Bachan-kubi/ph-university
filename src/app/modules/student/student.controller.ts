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

// 02
const deleteStudent  = catchAsync(async(req, res)=>{
    const  {studentId} = req.params;
    const result = await studentServices.deleteStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
      data: result
    }); 
});



//01 - it works on object _id //
// const deleteStudent = catchAsync(async (req, res) => {
//   const {studentId} = req.params;
//   console.log(studentId, 'cntr')
//   const result = await studentServices.deleteStudentsFromDB(studentId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is deleted succesfully',
//     data: result,
//   });
// });




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

