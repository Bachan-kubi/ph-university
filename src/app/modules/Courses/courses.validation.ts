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
const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
  });

  const facultiesWithCourseValidationSchema = z.object({
    body: z.object({
      faculties: z.array(z.string()),
    }),
  });
  const updateCourseValidationSchema = z.object({
    body: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z
        .array(updatePreRequisiteCourseValidationSchema)
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  });

export const coursesValidation = {
    createCoursesValidatonSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema
}