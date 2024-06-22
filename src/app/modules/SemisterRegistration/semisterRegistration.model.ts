import { Schema, model } from "mongoose";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";
import { TsemisterRegistration } from "./semisterRegistration.interface";



const semesterRegistrationSchema = new Schema({
    academicSemester: {
        type: Schema.Types.ObjectId,
        unique:true, 
        required: true, 
        ref: "AcademicSemister"
    },
    status: {type: String, enum: semesterRegistrationStatus, default: "UPCOMING"},
    startedDate: {type: Date, required: true},
    endedDate: {type: Date, required: true},
    maxCredit: {type: Number, default: 15},
    minCredit: {type: Number, default: 3}
}, {
    timestamps: true
});

export const SemesterRegistration = model<TsemisterRegistration>("SemesterRegistration", semesterRegistrationSchema);