import { Types } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import appError from '../../Error/appError';
import httpStatus from 'http-status';

// create students
const createStudentIntoDB = async (student: TStudent) => {
  const classStudent = new Student(student);
  // customs instance creation 
  if(await classStudent.isUserExist(student.id)){
    throw new appError(404, "user already existed!")
  }
  const result = classStudent.save();
  return result;
};
// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemister').populate({
    path: 'academicDepartment',
    populate:{path: 'academicFaculty'}
  });
  return result;
};
//getsingle student
const getSingleStudentsFromDB = async (id: string) => {
  // method-1
  const result = await Student.findById(id).populate('admissionSemister').populate({
    path: 'academicDepartment',
    populate:{path: 'academicFaculty'}
  });
  // const result = await Student.aggregate([
  //   {$match: {id: id}}
  // ])
  return result;
};
// delete
const isDeleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted: true});
  return result;
};

const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>)=>{
  const result = await Student.findByIdAndUpdate(
    // { _id: new Types.ObjectId(id) },
    {id},
    { $set: updateData },
    {new: true}
  );
  return result;
}

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  isDeleteStudentsFromDB,
  updateStudentFromDB
};
