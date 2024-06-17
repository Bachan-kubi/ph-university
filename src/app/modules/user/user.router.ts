import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import { createStudentValidationSchema } from '../student/zodValidation';
import { validationRequest } from '../../middleware/validationRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';




const router = express.Router();

router.post(
    '/create-student',
    validationRequest(createStudentValidationSchema),
    userController.createStudent
);
router.post("/create-faculty", validationRequest(createFacultyValidationSchema), userController.createFaculty);


export const userRouters = router;
