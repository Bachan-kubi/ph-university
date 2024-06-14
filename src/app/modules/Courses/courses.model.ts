import { Schema, model } from "mongoose";
import { Tcourses, TpreRequisiteCourses } from "./courses.interface";


const preRequisiteCoursesSchema = new Schema<TpreRequisiteCourses>({
    course: {type: Schema.Types.ObjectId, ref: "Courses"},
    isDeleted: {type:Boolean, default: false}
})
const coursesSchema = new Schema<Tcourses>({
    title: {type: String, required: true, unique:true, trim:true},
    prefix: {type: String, trim: true, required: true},
    code: {type: String, required: true, tri: true },
    credit: {type: Number, required: true, tri: true },
    isDeleted: {type:Boolean, default: false},
    preRequisiteCourses: [preRequisiteCoursesSchema]
});

export const Courses = model<Tcourses>("Courses", coursesSchema);