import httpStatus from "http-status";
import catchAsync from "../../utls/catchAsync";
import sendResponse from "../../utls/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.services";


const createAcademicFaculty = catchAsync(async (req, res) => {

  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty created successfully",
    data: result
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Faculties retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
  const {facultyId}= req.params;
  
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic Faculty retrieved successfully",
    data: result,
  });
});

const updateAcademicFaculty= catchAsync(async(req, res)=>{
  const {facultyId} = req.params;
  const payload = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Single Academic Faculty updated successfully`,
    data: result,
  });  
});





export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}