import { Types } from "mongoose";

export type Tcourses = {
    title: string;
    prefix: string;
    code: string;
    credit: number;
    isDeleted?: boolean;
    preRequisiteCourses: [TpreRequisiteCourses];
}
export type TpreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
};
export type TcoursesFaculties = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}