import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import { createStudentValidationSchema } from '../student/zodValidation';
import { validationRequest } from '../../middleware/validationRequest';




const router = express.Router();

router.post(
    '/create-student',
    validationRequest(createStudentValidationSchema),
    userController.createStudent
);


export const userRouters = router;
