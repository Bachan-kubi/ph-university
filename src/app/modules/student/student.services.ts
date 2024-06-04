import mongoose, { Types } from 'mongoose';
import { TStudent } from './student.interface';
import appError from '../../Error/appError';
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
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemister').populate({
    path: 'academicDepartment',
    populate: { path: 'academicFaculty' }
  });
  return result;
};
//getsingle student
const getSingleStudentsFromDB = async (studentId: string) => {
  // method-1
  const result = await Student.findById(studentId)
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
  console.log('service', id);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      {id},
      { isDeleted: true },
      { new: true, session },
    );
    console.log(deletedStudent, "deleted student")
    if (!deletedStudent) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to delete user');
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


const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>) => {
  const result = await Student.findByIdAndUpdate(
    // { _id: new Types.ObjectId(id) },
    { id },
    { $set: updateData },
    { new: true }
  );
  return result;
}

export const studentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentFromDB
};
