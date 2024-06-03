
import { Schema, model } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import appError from "../../Error/appError";
import httpStatus from "http-status";


export const academicDeaprtmentSchema = new Schema({
    name: { type: String, required: true },
    // import ref field accordingly, if you put in '' u will get error
    academicFaculty: { type: Schema.Types.ObjectId, ref:  AcademicFaculty},
}, { timestamps: true });
//if department exist
academicDeaprtmentSchema.pre('save', async function(next){
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name
    })
    if(isDepartmentExist){
        throw new appError(httpStatus.NOT_FOUND,"This Department already existed!");
    }
    next();
});
// if department dont exist
academicDeaprtmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if(!isDepartmentExist){
        throw new appError(httpStatus.NOT_FOUND, "The department doest exist!")
    }
    next();
})

export const AcademicDepartment = model<TacademicDepartment>("AcademicDepartment", academicDeaprtmentSchema);