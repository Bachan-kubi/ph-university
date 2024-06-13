import httpStatus from "http-status";
import catchAsync from "../../utls/catchAsync";
import sendResponse from "../../utls/sendResponse";
import { coursesServices } from "./courses.services";

const createCourses = catchAsync(async (req, res) => {

    const result = await coursesServices.createCoursesIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course created successfully",
      data: result
    });
  });
  const getAllCourses = catchAsync(async (req, res) => {
    const result = await coursesServices.getAllCoursesFromDB(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Courses retrieved successfully",
      data: result,
    });
  });
  
  const getSingleCourses = catchAsync(async(req, res)=>{
    const {id}= req.params;
    const result = await coursesServices.getSingleCoursesFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Courses retrieved successfully",
      data: result,
    });
  });
  const deleteCourses = catchAsync(async(req, res)=>{
    const {id}= req.params;
    const result = await coursesServices.deleteCoursesFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Courses deleted successfully",
        data: result,
      });
  })
  
//   const updateCourses= catchAsync(async(req, res)=>{
//     const {id} = req.params;
//     const payload = req.body;
//     const result = await coursesServices.;
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `Single Academic Faculty updated successfully`,
//       data: result,
//     });  
//   });

  export const courseController = {
    createCourses,
    getAllCourses,
    getSingleCourses,
    deleteCourses
  }