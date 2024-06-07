import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utls/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utls/catchAsync';



const getAllStudents = catchAsync(async (req, res) => {
  // seaching option added
  // console.log(req.query)

    const result = await studentServices.getAllStudentsFromDB(req.query);
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
      message: "Student Retrived successfull",
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
    const {student} = req.body;
    const result = await studentServices.updateStudentFromDB(studentId, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student updated successfully",
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

