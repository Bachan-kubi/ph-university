import httpStatus from "http-status";
import catchAsync from "../../utls/catchAsync";
import sendResponse from "../../utls/sendResponse";
import { AcademicServices } from "./academic.services";


const createAcademicSemister = catchAsync(async (req, res) => {

  const result = await AcademicServices.createAcademicSemisterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semister created successfully",
    data: result
  });
});
const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicServices.getAllAcademicSemisterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Semisters retrieved successfully",
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async(req, res)=>{
  const {semisterId}= req.params;
  const result = await AcademicServices.getSingleAcademicSemisterFromDB(semisterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic Semisters retrieved successfully",
    data: result,
  });
});

const updateAcademicSemister= catchAsync(async(req, res)=>{
  const {semisterId} = req.params;
  const payload = req.body;
  const result = await AcademicServices.updateAcademicSemisterIntoDB(semisterId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Academic Semisters updated successfully`,
    data: result,
  });  
});





export const AcademicSemisterController = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateAcademicSemister
}