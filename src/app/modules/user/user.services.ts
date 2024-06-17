import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import { Faculty } from "../Faculty/faculty.model";


// create students
// const createStudentIntoDB = async (password: string, payload: TStudent) => {
//   // create a user object
//   const userData: Partial<Tuser> = {};
//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);
//   //set student role
//   userData.role = 'student';
//   // Generate semester 4 digit number

//   // genarat user info
//   const admissionInfo = await AcademicSemister.findById(payload.admissionSemister);
//   if (!admissionInfo) {
//     throw new Error('Invalid admission semester');
//   }
//   // transaction and rollback for writing data in two database
//   // 01 start sessino
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     // generated id
//     userData.id = await generateStudentId(admissionInfo);
//     // create user (transaction-1)
//     const newUser = await User.create([userData], {session});
//     if(!newUser.length){
//       throw new appError(httpStatus.BAD_REQUEST, "Failed to create user!");
//     }
   
//       payload.id = newUser[0].id;
//       payload.user = newUser[0]._id;
      
//       // create student (transaction-2)
//       const newStudent = await Student.create([payload], {session});
//       if(!newStudent.length){
//         throw new appError(httpStatus.BAD_REQUEST, "Failed to create student!");
//       }
//       await session.commitTransaction();
//       await session.endSession()
//       return newStudent;
//   } catch (error:any) {
//     await session.abortTransaction();
//     await session.endSession()
//     throw new Error(error);
//   }
// };
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<Tuser> = {};
  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';
  // Generate semester 4 digit number

  // genarat user info
  const admissionInfo = await AcademicSemister.findById(payload.admissionSemister);
  if (!admissionInfo) {
    throw new Error('Invalid admission semester');
  }
  // transaction and rollback for writing data in two database
  // 01 start sessino
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generated id
    userData.id = await generateStudentId(admissionInfo);
    // create user (transaction-1)
    const newUser = await User.create([userData], {session});
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!");
    }
   
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      
      // create student (transaction-2)
      const newStudent = await Student.create([payload], {session});
      if(!newStudent.length){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!");
      }
      await session.commitTransaction();
      await session.endSession()
      return newStudent;
  } catch (error:any) {
    await session.abortTransaction();
    await session.endSession()
    throw new Error(error);
  }
};

// create faculty 
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB
}