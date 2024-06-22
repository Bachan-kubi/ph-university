import { z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]),
        startedDate: z.string().datetime(),
        endedDate: z.string().datetime(),
        maxCredit: z.number(),
        minCredit: z.number()
    })
});
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]).optional(),
        startedDate: z.string().datetime().optional(),
        endedDate: z.string().datetime().optional(),
        maxCredit: z.number().optional(),
        minCredit: z.number().optional()
    })
})

export const semesterRegiValidation = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}
