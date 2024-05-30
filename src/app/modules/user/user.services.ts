import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { Tuser } from "./user.interface";
import { User } from "./user.model";


// create students
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
// create a user object
const userData: Partial<Tuser> = {};
 //if password is not given , use deafult password
 userData.password = password || (config.default_password as string);
 //set student role
 userData.role = 'student';

 //set manually generated it
 userData.id = '2030100001';
 // create user
 const newUser = await User.create(userData);
if(Object.keys(newUser).length){
    studentData.id = newUser.id;
    studentData.user= newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
}
  return newUser;
};

export const userServices = {
    createStudentIntoDB,
}