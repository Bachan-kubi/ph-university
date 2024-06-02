import config from "../../config";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


// create students
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
 //set manually generated it
 userData.id = await generateStudentId(admissionInfo);
 // create user
 const newUser = await User.create(userData);
if(Object.keys(newUser).length){
    payload.id = newUser.id;
    payload.user= newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
}
  return newUser;
};

export const userServices = {
    createStudentIntoDB,
}