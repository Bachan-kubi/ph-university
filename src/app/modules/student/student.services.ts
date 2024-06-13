import mongoose, { Types } from 'mongoose';
import { TStudent } from './student.interface';
import AppError from '../../Error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Student } from './student.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchingItems } from './students.constant';

// create students with class inst
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
  // for partial search query
  // let searchTerm = "";
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const queryObj = { ...query };
  // const searchingItems = ['email', 'name.firstName', 'presentAddress'];

  // const searchQuery = Student.find({
  //   $or: searchingItems.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" }
  //   }))
  // });
  // // filter // Filter out unnecessary fields from query
  // const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeField.forEach((ele) => delete queryObj[ele]);
  // console.log({ queryObj, query });

  // const filterQuery = searchQuery.find(queryObj).populate('admissionSemister').populate({
  //   path: 'academicDepartment',
  //   populate: { path: 'academicFaculty' }
  // });
  // // sort
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // };
  // const sortQuery = filterQuery.sort(sort);

  // // limit query 
  // let limit = 1;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // };
  // // paginate query
  // let page = 1;
  // let skip = 0;
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page-1)*limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);

  // // const limitQuery = await sortQuery.limit(limit);
  // const limitQuery = paginateQuery.limit(limit);

  // // field sorting
  // let fields = "-__v";
  // if(query.fields){
  //   fields = (query.fields as string).split(",").join(" ");
  // }
  // const fieldQuery = await limitQuery.select(fields);

  const studentQuery = new QueryBuilder(Student.find().populate('admissionSemister').populate({
    path: 'academicDepartment',
    populate: { path: 'academicFaculty' }
  }), query)
  .search(searchingItems)
  .filter()
  .sort()
  .paginate()
  .fields();
  const result = await studentQuery.modelQuery
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
  // const result = await Student.findOne({id})// for custom id
  const result = await Student.findById(id)// for mongoId
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
    const deletedStudent = await Student.findByIdAndUpdate(
      id ,
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
  let { name, guardian, localGuardian, ...remainingStudentsData } = payload;
  const modifiedStudentData: Record<string, unknown> = { ...remainingStudentsData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  };
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  };
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  };

  console.log(modifiedStudentData);
  const result = await Student.findByIdAndUpdate(
     id ,
    modifiedStudentData,
    { new: true, runValidators: true }
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
