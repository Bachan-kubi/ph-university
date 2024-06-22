import httpStatus from "http-status";
import catchAsync from "../../utls/catchAsync";
import sendResponse from "../../utls/sendResponse";
import { semesterRegistraionServices } from "./semisterRegistration.services";

const createSemesterRegistration = catchAsync(async(req, res)=>{
   const result = await semesterRegistraionServices.createSemesterRegiIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration created succesfully',
        data: result,
      });
});
const getAllSemiRegisterData = catchAsync(async(req, res)=>{
    const result = await semesterRegistraionServices.getAllSemesterRegFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration retieved succesfully!!',
        data: result,
      });
})
const getSingleSemiRegisterData = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await semesterRegistraionServices.getSingleSemesterRegFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semester Registration retieved succesfully!!',
        data: result,
      });
})
const updateSemiRegisterData = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await semesterRegistraionServices.updateSemeRegiIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Semester Registration updated succesfully!!',
        data: result,
      });
})

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemiRegisterData,
    getSingleSemiRegisterData,
    updateSemiRegisterData
}