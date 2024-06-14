import { string } from "joi";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchabelFeilds } from "./courses.constant";
import { Tcourses } from "./courses.interface";
import { Courses } from "./courses.model"

// create post 
const createCoursesIntoDB = async (payload: Tcourses)=>{
    const result = await Courses.create(payload);
    return result
};

// all courses
//query: Record<string, unknown>
const getAllCoursesFromDB = async(query: Record<string, unknown>)=>{
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
const getSingleCoursesFromDB = async(id: string)=>{
    const result = await Courses.findById(id).populate("preRequisiteCourses.course");
    return result;
};
// delete course
const deleteCoursesFromDB = async(id: string)=>{
    const result = await Courses.findByIdAndUpdate(
        id, 
        {isDeleted: true}, 
        {new: true}
    );
    return result;
}
const updateCoursesInDB = async(id: string, payload: Partial<Tcourses>)=>{
    const {preRequisiteCourses, ...remainingCourseData} = payload;
    console.log(preRequisiteCourses);
    const updateBasicCourse = await Courses.findByIdAndUpdate(
        id, 
        remainingCourseData,
        {new: true, runValidators: true}
    );
    if(preRequisiteCourses && preRequisiteCourses.length>0){
        // filter out deleted fields
        const deletedPreRequisites = preRequisiteCourses.filter(el=>el.course && el.isDeleted);
        const deletedCourse = deletedPreRequisites.map(el=>el.course);
        await Courses.findByIdAndUpdate(id,
            {
                $pull: {preRequisiteCourses: {course: {$in:deletedCourse}}}
            }
        )
        console.log(deletedCourse);
    }
    return updateBasicCourse;
}


export const coursesServices = {
    createCoursesIntoDB,
    getAllCoursesFromDB,
    getSingleCoursesFromDB,
    deleteCoursesFromDB,
    updateCoursesInDB
}