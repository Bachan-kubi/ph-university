import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { User } from "./user.model";


// find last studnet id
const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        { role: 'student' },
        {
            id: 1,
            _id: 0
        }
    )
    .sort({createdAt: -1})
    .lean()
    return lastStudent?.id? lastStudent.id : undefined;
};
// generate student id = 2023020001
export const generateStudentId = async (payload: TAcademicSemister) => {
    // right upto below line
    // let currentId = (await findLastStudent())||(0).toString();
    // change to manage other semister year and code
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastStudentSemisterCode = lastStudentId?.substring(4,6);
    const lastStudnetSemisterYear = lastStudentId?.substring(0,4);
    const currentStudnetSemisterCode = payload.code;
    const currentStudnetSemisterYear = payload.year;
    if(lastStudentId && lastStudentSemisterCode === currentStudnetSemisterCode && lastStudnetSemisterYear === currentStudnetSemisterYear ){
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
    
};



