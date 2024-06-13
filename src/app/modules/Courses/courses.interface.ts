import { Types } from "mongoose";

export type Tcourses = {
    title: string;
    prefix: string;
    code: string;
    credit: number;
    isDeleted?: boolean;
    preRequisiteCourses: [];
}
export type TpreRequisiteCourses = {
    course: Types.ObjectId;
    isDeleted: boolean;
}