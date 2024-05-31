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

export const AcademicSemisterController = {
    createAcademicSemister,
}