import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async(payload: TAcademicSemister)=>{
    const result = await AcademicSemister.create(payload);
    return result;
}

export const AcademicServices = {
    createAcademicSemisterIntoDB,
}