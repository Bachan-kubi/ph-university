import { Schema, model } from "mongoose";
// import { Tuser } from "./user.interface";
import { TAcademicSemister, TAcademicSemisterCode, TAcademicSemisterName, TMonth } from "./academicSemister.interface";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";


const Months: TMonth[] = [
    "January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"
];

const AcademicSemisterName: TAcademicSemisterName[]= ['Autumn','Summer', 'Fall'];
const AcademicSemisterCode: TAcademicSemisterCode[]= ['01','02', '03'];

const academicSemisterSchema = new Schema<TAcademicSemister>({
    name: {type: String, required: true, enum:AcademicSemisterName},
    code: {type: String, required: true, enum: AcademicSemisterCode},
    year: {type: String, required: true},
    startMonth: {type: String, required: true, enum: Months},
    endMonth: {type: String, required: true, enum: Months}
},{
    timestamps: true
});


// validate data before saving same data
academicSemisterSchema.pre('save', async function(next){
const isSemisterExist = await AcademicSemister.findOne({
    year: this.year,
    name: this.name
});
if(isSemisterExist){
    throw new AppError(httpStatus.NOT_FOUND,`Year ${this.year}  and ${this.name} semister already exist!`);
}
next();
});

export const AcademicSemister = model<TAcademicSemister>("AcademicSemister", academicSemisterSchema);