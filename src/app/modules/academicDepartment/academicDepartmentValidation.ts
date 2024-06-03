import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Departmnt must be string',
      required_error: "Name is requiered!"
    }),
    academicFaculty: z.object({
        name: z.string({
            invalid_type_error: 'Academic Faculty must be string',
            required_error: "Faculty is requiered!"
          })
    })
  })
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
          invalid_type_error: 'Academic Departmnt must be string',
          required_error: "Name is requiered!"
        }),
        academicFaculty: z.object({
            name: z.string({
                invalid_type_error: 'Academic Departmnt must be string',
                required_error: "Faculty is requiered!"
              })
        })
      })
  
});


export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema
};


