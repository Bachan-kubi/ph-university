import mongoose, { Types } from 'mongoose';
import { TStudent } from './student.interface';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Student } from './student.model';

// create students
// const createStudentIntoDB = async (student: TStudent) => {
//   const classStudent = new Student(student);
//   // customs instance creation 
//   if (await classStudent.isUserExist(student.id)) {
//     throw new appError(404, "user already existed!")
//   }
//   const result = classStudent.save();
//   return result;
// };


// get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // {email: {$regex: query.searchTerm, $options: i}}
  // {address: {$regex: query.searchTerm, $options: i}}
  // {"name.firstName": {$regex: query.searchTerm, $options: i}}
  let searchTerm = "";
  if(query?.searchTerm){
    searchTerm= query?.searchTerm as string;
  }
  const result = await Student.find().populate('admissionSemister').populate({
    path: 'academicDepartment',
    populate: { path: 'academicFaculty' }
  });
  return result;
};
//getsingle student
// 01 get single data with _id
// const getSingleStudentsFromDB = async (id: string) => {
//   // method-1
//   // const result = await Student.findById(studentId) // for _id
//   const result = await Student.findOne({id})// for custom id
//   .populate('admissionSemister').populate({
//     path: 'academicDepartment',
//     populate: { path: 'academicFaculty' }
//   });
//   // const result = await Student.aggregate([
//   //   {$match: {id: id}}
//   // ])
//   return result;
// };


// 02- get single data with custom id
const getSingleStudentsFromDB = async (id: string) => {
  // method-1
  // const result = await Student.findById(studentId) // for _id
  const result = await Student.findOne({ id })// for custom id
    .populate('admissionSemister').populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' }
    });
  // const result = await Student.aggregate([
  //   {$match: {id: id}}
  // ])
  return result;
};

//01 delete
const deleteStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    console.log(deletedStudent, "deleted student")
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student!!!!');
  }
};

// 02 workable delete function on object id
// const deleteStudentsFromDB = async (studentId: string) => {
//   console.log('ser', studentId);
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const deletedStudent = await Student.findByIdAndUpdate(
//       studentId,
//       { isDeleted: true },
//       { new: true, session },
//     );
//     console.log(deletedStudent, "deleted student")
//     if (!deletedStudent) {
//       throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete student');
//     }
//     const userId = deletedStudent.user;
//     console.log(userId, 'u');
//     const deletedUser = await User.findByIdAndUpdate(
//       userId,
//       { isDeleted: true },
//       { new: true, session },
//     );

//     if (!deletedUser) {
//       throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete user');
//     }
//     await session.commitTransaction();
//     await session.endSession();

//     return deletedStudent;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error('Failed to delete student!!!!');
//   }
// };

// update 01
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  let {name, guardian, localGuardian, ...remainingStudentsData} = payload;
  const modifiedStudentData: Record<string, unknown> = {...remainingStudentsData}

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedStudentData[`name.${key}`] = value;
    }
  };
  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedStudentData[`guardian.${key}`] = value;
    }
  };
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  };

  console.log(modifiedStudentData);
  const result = await Student.findOneAndUpdate(
    {id}, 
    modifiedStudentData, 
    {new: true, runValidators: true}
  );
  return result;
}

// update-02
// const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>) => {
//   const result = await Student.findOneAndUpdate(
//     // { _id: new Types.ObjectId(id) },
//     { id },
//     { $set: updateData },
//     { new: true }
//   );
//   return result;
// }

export const studentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentFromDB
};
