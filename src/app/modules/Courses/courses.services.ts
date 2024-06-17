import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchabelFeilds } from "./courses.constant";
import { Tcourses, TcoursesFaculties } from "./courses.interface";
import { CourseFaculty, Courses } from "./courses.model"
import mongoose from "mongoose";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";

// create post 
const createCoursesIntoDB = async (payload: Tcourses) => {
    const result = await Courses.create(payload);
    return result
};

// all courses
//query: Record<string, unknown>
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    // const result = await Courses.find()
    const courseQuery = new QueryBuilder(Courses.find().populate("preRequisiteCourses.course"), query)
        .search(courseSearchabelFeilds)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await courseQuery.modelQuery;
    return result;
}
// get single courses 
const getSingleCoursesFromDB = async (id: string) => {
    const result = await Courses.findById(id).populate("preRequisiteCourses.course");
    return result;
};
// delete course
const deleteCoursesFromDB = async (id: string) => {
    const result = await Courses.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};
const updateCoursesInDB = async (id: string, payload: Partial<Tcourses>) => {
    const { preRequisiteCourses, ...remainingCourseData } = payload;
    console.log(preRequisiteCourses);
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const updateBasicCourse = await Courses.findByIdAndUpdate(
            id,
            remainingCourseData,
            { new: true, runValidators: true, session }
        );
        // show error msg 
        if (!updateBasicCourse) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic info!")
        }
        // check if there any preRequisite courses to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out deleted fields
            const deletedPreRequisites = preRequisiteCourses.filter(el => el.course && el.isDeleted).map(el => el.course);
            const deletedPreRequisitesCourses = await Courses.findByIdAndUpdate(id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
                }, { new: true, runValidators: true, session }
            );
            if (!deletedPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic info!")
            }
            // filter out courses
            const newPreRequisites = preRequisiteCourses.filter(el => el.course && !el.isDeleted);
            const newPreRequisiteCourses = await Courses.findByIdAndUpdate(
                id,
                { $addToSet: { preRequisiteCourses: { $each: newPreRequisites } } }, { new: true, runValidators: true, session }
            );
            if (!newPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic info!")
            }
            const result = await Courses.findById(id).populate("preRequisiteCourses.course");
            return result;
        }
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic info!")
    }
};
const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TcoursesFaculties>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } }
        },
        { upsert: true, new: true }
    );
    return result;
}
const removeFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TcoursesFaculties>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } }
        },
        { new: true }
    );
    return result;
}


export const coursesServices = {
    createCoursesIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    deleteCoursesFromDB,
    updateCoursesInDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesWithCourseIntoDB
}