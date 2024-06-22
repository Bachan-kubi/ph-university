import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TsemisterRegistration } from "./semisterRegistration.interface";
import { SemesterRegistration } from "./semisterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegiIntoDB = async(payload: TsemisterRegistration)=>{
    const academicSemester = payload?.academicSemester;
    // check existance of academic semester from db
    const isAcademicSemesterExists = await AcademicSemister.findById(academicSemester);
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, "Academic Semester not found!!")
    };
    // check if already semester registered
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({academicSemester})
    if(isSemesterRegistrationExist){
        throw new AppError(httpStatus.CONFLICT, "Academic Semester already existed!!")
    }
    const result = await SemesterRegistration.create(payload);
    return result;
};
// get all semester registration
const getAllSemesterRegFromDB = async(query: Record<string, unknown>)=>{
    const semesterRegQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester"), query).filter().sort().paginate().fields();
    const result = await semesterRegQuery.modelQuery;
    return result;
}
const getSingleSemesterRegFromDB = async(id: string)=>{
    const result = await SemesterRegistration.findById(id);
    return result;
}
// update semester registration 
const updateSemeRegiIntoDB=async(id: string, payload: Partial<TsemisterRegistration>)=>{
    const isSemesterRegiExists = await SemesterRegistration.findById(id);
    if(!isSemesterRegiExists){
        throw new AppError(httpStatus.NOT_FOUND, "This Semester is not found!!");
    };
    // if requested semeRegi is ENDED, we will not update!!
    const currentSemesterStatus = isSemesterRegiExists?.status;
    if(currentSemesterStatus=== "ENDED"){
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    }
}



export const semesterRegistraionServices = {
    createSemesterRegiIntoDB,
    getAllSemesterRegFromDB,
    getSingleSemesterRegFromDB,
    updateSemeRegiIntoDB
}