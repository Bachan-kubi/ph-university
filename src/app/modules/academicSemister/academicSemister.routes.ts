import { Router } from "express";
import { AcademicSemisterController } from "./academicSemister.controller";
import { validationRequest } from "../../middleware/validationRequest";
import { academicSemesterValidation, createAcademicSemesterValidationSchema } from "./academicSemisterValidation";


const router = Router();


router.post('/create-academic-semester', validationRequest(createAcademicSemesterValidationSchema), AcademicSemisterController.createAcademicSemister);
router.get('/', AcademicSemisterController.getAllAcademicSemister);
router.get('/:semisterId', AcademicSemisterController.getSingleAcademicSemister);
router.patch('/:semisterId', validationRequest(academicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemisterController.updateAcademicSemister);


export const academicRouter = router;