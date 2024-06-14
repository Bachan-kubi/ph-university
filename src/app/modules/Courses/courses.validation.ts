import { z } from "zod";
const preRequisiteCoursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
const createCoursesValidatonSchema = z.object({
    body: z.object({
        title: z.string(), 
    prefix: z.string(),
    code: z.string(),
    credit: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses:z.array(preRequisiteCoursesValidationSchema).optional()
    })
});
const updateCourseValidatonSchema = createCoursesValidatonSchema.partial();

export const coursesValidation = {
    createCoursesValidatonSchema,
    updateCourseValidatonSchema
}