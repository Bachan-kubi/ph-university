import { Router } from "express";
import { AcademicSemisterController } from "./academicSemister.controller";
import { validationRequest } from "../../middleware/validationRequest";
import { createAcademicSemesterValidationSchema } from "./academicSemisterValidation";


const router = Router();

router.post('/create-academic-semester', validationRequest(createAcademicSemesterValidationSchema), AcademicSemisterController.createAcademicSemister);

export const academicRouter = router;