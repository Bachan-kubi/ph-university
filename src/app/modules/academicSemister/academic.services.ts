import { AcademicSemisterNameCodeMapper } from "./academic.constant";
import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
    
    if (AcademicSemisterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error(`Academic name and code doesnt match!`);
    }
    const result = await AcademicSemister.create(payload);
    return result;
};

const getAllAcademicSemisterFromDB =async ()=>{
    const result = await AcademicSemister.find();
    return result;
};
const getSingleAcademicSemisterFromDB = async(id: any)=>{
    const result = await AcademicSemister.findById(id);
    return result;
};

const updateAcademicSemisterIntoDB = async(id: string, payload: Partial<TAcademicSemister>)=>{
    if(payload.name && payload.code&&AcademicSemisterNameCodeMapper[payload.name] !== payload.code){
        throw new Error("Invalid Academic code!!")
    }
    const result = await AcademicSemister.findOneAndUpdate({_id:id}, payload, {new: true});
    return result;
};



export const AcademicServices = {
    createAcademicSemisterIntoDB,
    getAllAcademicSemisterFromDB,
    getSingleAcademicSemisterFromDB,
    updateAcademicSemisterIntoDB
};