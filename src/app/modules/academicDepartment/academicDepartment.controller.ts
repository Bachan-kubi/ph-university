import httpStatus from "http-status";
import catchAsync from "../../utls/catchAsync";
import sendResponse from "../../utls/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartment = catchAsync(async (req, res) => {

  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Department retrieved successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
  const {departmentId}= req.params;
  
  const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic Department retrieved successfully",
    data: result,
  });
});

const updateAcademicDepartment= catchAsync(async(req, res)=>{
  const {departmentId} = req.params;
  const payload = req.body;
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Academic Department updated successfully`,
    data: result,
  });  
});





export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}