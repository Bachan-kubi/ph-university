import { Types } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

// create students
const createStudentIntoDB = async (student: TStudent) => {
  const classStudent = new Student(student);
  // customs instance creation 
  if(await classStudent.isUserExist(student.id)){
    throw new Error("user already existed!")
  }
  const result = classStudent.save();
  return result;
};
// get all students
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
//getsingle student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
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
